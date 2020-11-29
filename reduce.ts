import { $, _ } from './hkts';
import { multiArity, reducer } from './transduce';

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
  const next = reducer(acc, x);
  return reduceList(reducer, next, xs);
};

export const concatList = <T, Coll, Res>(step: reducer<T, Coll, Res>) => (
  result: Coll,
  input: T[]
) =>
  reduceList(
    multiArity({ arity0: () => result, arity1: (x) => x, arity2: step }),
    result,
    input
  );

export const conjList = <V>(list: V[], x: V): V[] => [...list, x];
