import { Implement } from '../../types';
import { rods } from './rods';
import { staffs } from './staffs';
import { wands } from './wands';

export const allImplements = (): Implement[] => [
  ...rods(),
  ...staffs(),
  ...wands(),
];
