import { reduceList } from './reduce';
import { map } from './transduce';

const conjMap = (xs: any, x: any) => ({ ...xs, [Math.random()]: x });

console.log(reduceList(map((x: any) => x + 1)(conjMap), [], [1, 2, 3, 4, 5]));
