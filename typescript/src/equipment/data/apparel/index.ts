import { Apparel } from '../../types';
import { arms } from './arms';
import { head } from './head';
import { jewelry } from './jewelry';
import { legs } from './legs';
import { torso } from './torso';

export function allApparel(): Apparel[] {
  return [...arms(), ...head(), ...jewelry(), ...legs(), ...torso()];
}
