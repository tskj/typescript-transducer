import { $, _ } from './hkts';
import { reducer } from './transduce';

interface IReducable<x> {
  _reduce<Acc, Res>(reducer: reducer<x, Acc, Res>, init?: Acc): Res;
}

export const reduceList = <V, Acc, Res>(
  reducer: reducer<V, Acc, Res>,
  acc: Acc,
  list: V[]
): Res => {
  if (list.length === 0) {
    return reducer(acc);
  }
  const [x, ...xs] = list;
  return reduceList(reducer, reducer(acc, x), xs);
};

export const concatList = <T, Coll, Res>(step: reducer<T, Coll, Res>) => (
  result: Coll,
  input: T[]
) => reduceList(step, result, input);

export const conjList = <V>(list: V[], x: V): V[] => [...list, x];
