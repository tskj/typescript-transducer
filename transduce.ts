import { $, _ } from './hkts';

export interface reducer<x, Coll, Result> {
  (): Coll;
  (result: Coll): Result;
  (result: Coll, input: x): Coll;
}
export type transducer<a, b, Coll, Result> = (
  r: reducer<b, Coll, Result>
) => reducer<a, Coll, Result>;

const reducedSymbol: unique symbol = Symbol('reduced');
type Reduced<T> = { [reducedSymbol]: true; value: T };
const reduced = <T>(value: T): Reduced<T> => ({ [reducedSymbol]: true, value });
const isReduced = <T>(x: unknown): x is Reduced<T> => x[reducedSymbol] === true;
const derefReduced = <T>(x: Reduced<T>): T => x.value;

const transducer = <b, Coll, Result>(step: reducer<b, Coll, Result>) => <a>(
  reducer: (result: Coll, input: a) => Coll,
  onComplete: (result: Coll) => Coll = (x) => x
): reducer<a, Coll, Result> =>
  ((result?: Coll, input?: a) => {
    if (result === undefined) {
      return step();
    }
    if (input === undefined) {
      return step(onComplete(result));
    }
    return reducer(result, input);
  }) as reducer<a, Coll, Result>;

export const map = <a, b, Coll, Result>(
  f: (x: a) => b
): transducer<a, b, Coll, Result> => (step) =>
  transducer(step)((result, input) => {
    return step(result, f(input));
  });

export const filter = <a, Coll, Res>(
  p: (x: a) => boolean
): transducer<a, a, Coll, Res> => (step) =>
  transducer(step)((result, input) => {
    if (p(input)) {
      return step(result, input);
    } else {
      return result;
    }
  });

// const flatmapping = <a, b>(f: (x: a) => any) => (r) => (result, value) =>
//   r(result, f(value));

const take = <a, Coll, Res>(n: number): transducer<a, a, Coll, Res> => (
  step
) => {
  let taken = 0;
  return transducer(step)((result, value) => {
    if (taken === n) {
      throw step(result);
    }
    taken++;
    return step(result, value);
  });
};

// repeat
// partition
// taking-while
