import { theHouseOfLiberation } from './the_house_of_liberation';
import { latexify } from '../latex/format/latexify';
import { dedent } from '../util/dedent';

export interface Module {
  description: string;
  introduction: string;
  name: string;
}

export function getAllModules(): Module[] {
  return [theHouseOfLiberation];
}

export function moduleToLatex(module: Module): string {
  return latexify(
    dedent(`
      \\chapter{${module.name}}

      ${module.introduction}

      ${module.description}
    `),
  );
}
