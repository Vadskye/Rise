import { Tool } from '../../types';
import { kits } from './kits';
import { mounts } from './mounts';
import { objects } from './objects';
import { traps } from './traps';

export function tools(): Tool[] {
  return [
    ...kits(),
    ...mounts(),
    ...objects(),
    ...traps(),
  ];
}
