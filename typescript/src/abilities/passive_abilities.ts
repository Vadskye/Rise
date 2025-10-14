// TODO: does this file need any other content? Passive abilities are pretty simple, and
// most of the logic we have for them is contained in
// `convertPassiveAbilityToMonsterLatex`.
export interface PassiveAbility {
  effect: string;
  // This has no corresponding field in the Roll20 HTML. It's only used for monster LaTeX
  // generation.
  isMagical?: boolean;
  name: string;
}
