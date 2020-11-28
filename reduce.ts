import { $, _ } from './hkts';
import { reducer } from './transduce';

interface IReducable<x> {
  _reduce<F, c>(reducer: reducer<x, F, c>, init?: $<F, [c]>): $<F, [c]>;
}

export const reduceList = <F, x, V>(
  reducer: reducer<V, F, x>,
  result: $<F, [x]>,
  list: V[]
): $<F, [x]> => {
  if (list.length === 0) {
    return reducer(result);
  }
  const [x, ...xs] = list;
  return reduceList(reducer, reducer(result, x), xs);
};

export const concatList = <T, F, c, Coll extends $<F, [c]>>(
  step: reducer<T, F, c>
) => (result: Coll, input: T[]) => reduceList(step, result, input);

export const conjList = <V>(list: V[], x: V): V[] => [...list, x];
