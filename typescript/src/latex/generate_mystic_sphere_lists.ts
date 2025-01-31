import { MysticSphere, mysticSpheres, MysticSphereSource } from "@src/mystic_spheres";
import { titleCase } from "change-case";

export function generateMysticSphereLists(): string {
  const sources: MysticSphereSource[] = ["arcane", "divine", "nature", "pact"];
  return sources.map(generateSourceList).join("\n");
}

function generateSourceList(source: MysticSphereSource): string {
  const sourceSpheres = mysticSpheres.filter((sphere) => sphere.sources.includes(source));
  return `
    {
      \\RaggedRight
      \\subsection{${titleCase(source)} Mystic Spheres}\\label{${titleCase(source)} Mystic Spheres}

      ${sourceSpheres.map(formatSphere).join("\n")}
      ${
        source === "divine"
          ? `
            \\subsubsection{Domain-Exclusive Spheres}
            ${mysticSpheres
              .filter((sphere) => sphere.sources.includes("domain"))
              .map(formatSphere)
              .join("\n")}
          `
          : ""
      }

      ${
        source === "pact"
          ? `
            \\subsubsection{Soulkeeper-Exclusive Spheres}
            ${mysticSpheres
              .filter((sphere) => sphere.sources.includes("soulkeeper"))
              .map(formatSphere)
              .join("\n")}
          `
          : ""
      }
    }
  `;
}

function formatSphere(sphere: MysticSphere): string {
  return `\\par\\noindent \\sphere{${sphere.name}}: ${sphere.shortDescription}`;
}
