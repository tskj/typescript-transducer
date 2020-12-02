import { InitReducer, multiArity, reducer } from './transduce';

interface IReducable<x> {
  _reduce<Acc, Res>(reducer: reducer<x, Acc, Res>): Res;
  _reduce<Acc, Res>(reducer: InitReducer<x, Acc, Res>, init: Acc): Res;
}

export const concatList = <T, Coll, Res>(step: reducer<T, Coll, Res>) => (
  result: Coll,
  input: IReducable<T>
) =>
  input._reduce(
    multiArity({ arity0: () => result, arity1: (x) => x, arity2: step })
  );

declare global {
  interface Array<T> extends IReducable<T> {}
}
Array.prototype._reduce = function <V, Acc, Res>(
  this: V[],
  reducer: any,
  acc?: any
): Res {
  if (acc === undefined) {
    return this._reduce(reducer, reducer());
  }
  if (this.length === 0) {
    return reducer(acc);
  }
  const [x, ...xs] = this;
  const next = reducer(acc, x);
  return xs._reduce(reducer, next);
};
export const conjList = <V>(list: V[], x: V): V[] => [...list, x];

const x = ['']._reduce<number, number>((acc: number, res: string) => acc, 0);
