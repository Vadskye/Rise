import cli from 'commander';
import { printTable, printBarChart, calculateBreakdown } from './cli_output';

interface Entity {
  name: string;
}

export type TableOrientation = 'rowsAsGroups' | 'columnsAsGroups';

export interface BreakdownConfig<E extends Entity, I, G extends string | number> {
  additionalOptions?: (command: cli.Command) => void;
  entities: E[];
  entityTypePlural: string;
  entityTypeSingular: string;
  getItemGroups: (item: I) => G | G[] | undefined;
  getItems: (entity: E) => I[];
  groups: readonly G[];
  groupType: string;
  processOptions?: (options: any, groups: readonly G[]) => readonly G[];
  tableOrientation: TableOrientation;
}

export function run(config: BreakdownConfig<any, any, any>) {
  const command = new cli.Command();
  command
    .option('--chart', 'Display data as a bar chart')
    .option(
      `--${config.entityTypePlural} <names>`,
      `Comma-separated list of ${config.entityTypePlural} to display`
    );

  if (config.additionalOptions) {
    config.additionalOptions(command);
  }

  command.parse(process.argv);
  const options = command.opts();

  let groups = [...config.groups];
  // sort is mutable
  groups.sort();

  if (config.processOptions) {
    groups = [...config.processOptions(options, groups)];
  }

  const sortedEntities = [...config.entities].sort((a, b) => a.name.localeCompare(b.name));

  const { fullBreakdown, totals, averageCounts } = calculateBreakdown(
    sortedEntities,
    groups,
    config.getItemGroups,
    config.getItems
  );

  fullBreakdown['Average'] = averageCounts;

  const entitiesToShowNames: string[] =
    options[config.entityTypePlural]
      ? options[config.entityTypePlural].split(',')
      : options.chart
      ? sortedEntities.map(e => e.name)
      : [...sortedEntities.map(e => e.name), 'Average'];

  if (options.chart) {
    for (const entityName of entitiesToShowNames) {
      if (fullBreakdown[entityName]) {
        printBarChart(
          entityName,
          fullBreakdown[entityName],
          averageCounts,
          config.groupType
        );
      }
    }
  } else {
    if (config.tableOrientation === 'columnsAsGroups') {
        const header: string[] = [config.entityTypeSingular, ...groups.map(String), 'Total'];
        const tableData: (string | number)[][] = [header];

        for (const entityName of entitiesToShowNames) {
            const row: (string | number)[] = [entityName];
            let entityTotal = 0;
            for (const group of groups) {
                const count: number = fullBreakdown[entityName]?.[String(group)] || 0;
                row.push(count);
                entityTotal += count;
            }
            row.push(entityTotal);
            tableData.push(row);
        }

        const totalRow: (string | number)[] = ['**Total**'];
        let grandTotal = 0;
        for (const group of groups) {
            let groupSum = 0;
            for (const entityName of entitiesToShowNames) {
                groupSum += fullBreakdown[entityName]?.[String(group)] || 0;
            }
            totalRow.push(groupSum);
            grandTotal += groupSum;
        }
        totalRow.push(grandTotal);
        tableData.push(totalRow);
        printTable(tableData);
    } else { // rowsAsGroups
        const header: string[] = [config.groupType, ...entitiesToShowNames, 'Total'];
        const tableData: (string | number)[][] = [header];

        for (const group of groups) {
            const row: (string | number)[] = [String(group)];
            for (const entityName of entitiesToShowNames) {
                const count: number = fullBreakdown[entityName]?.[String(group)] || 0;
                row.push(count);
            }
            row.push(totals[String(group)] || 0);
            tableData.push(row);
        }

        const totalRow: (string | number)[] = ['**Total**'];
        let grandTotal = 0;
        for (const entityName of entitiesToShowNames) {
            const entityTotal: number = Object.values(
                fullBreakdown[entityName] || {}
            ).reduce((a: number, b: number) => a + b, 0);
            totalRow.push(entityTotal);
            grandTotal += entityTotal;
        }
        totalRow.push(grandTotal);
        tableData.push(totalRow);
        printTable(tableData);
    }
  }
}
