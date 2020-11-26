import { $, _ } from './hkts';

type reducer<x, F, c> = (result: $<F, [c]>, value: x) => $<F, [c]>;
type transducer<a, b, F, c> = (r: reducer<b, F, c>) => reducer<a, F, c>;

const reducedSymbol: unique symbol = Symbol('reduced');
type Reduced<T> = { [reducedSymbol]: true; value: T };
const reduced = <T>(value: T): Reduced<T> => ({ [reducedSymbol]: true, value });
const isReduced = <T>(x: unknown): x is Reduced<T> => x[reducedSymbol] === true;
const derefReduced = <T>(x: Reduced<T>): T => x.value;

export const map = <a, b, F, c>(f: (x: a) => b): transducer<a, b, F, c> => (
  step
) => (result, value) => step(result, f(value));

export const filter = <a, F, c>(
  p: (x: a) => boolean
): transducer<a, a, F, c> => (step) => (result, value) => {
  if (p(value)) {
    return step(result, value);
  } else {
    return result;
  }
};

// const flatmapping = <a, b>(f: (x: a) => any) => (r) => (result, value) =>
//   r(result, f(value));

const take = <a, F, c>(n: number): transducer<a, a, F, c> => (step) => {
  let taken = 0;
  return (result, value) => {
    if (taken === n) {
      return result;
    }
    taken++;
    return step(result, value);
  };
};

// repeat
// partition
// taking-while
