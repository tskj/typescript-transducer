import { $, _ } from './hkts';

export interface reducer<x, F, c> {
  (): $<F, [c]>;
  <d>(result: $<F, [c]>): d;
  (result: $<F, [c]>, input: x): $<F, [c]>;
}
export type transducer<a, b, F, c> = (r: reducer<b, F, c>) => reducer<a, F, c>;

const reducedSymbol: unique symbol = Symbol('reduced');
type Reduced<T> = { [reducedSymbol]: true; value: T };
const reduced = <T>(value: T): Reduced<T> => ({ [reducedSymbol]: true, value });
const isReduced = <T>(x: unknown): x is Reduced<T> => x[reducedSymbol] === true;
const derefReduced = <T>(x: Reduced<T>): T => x.value;

export const map = <a, b, F, c>(f: (x: a) => b): transducer<a, b, F, c> => (
  step
): reducer<a, F, c> => (result = undefined, input = undefined) => {
  if (result === undefined) {
    return step();
  }
  if (input === undefined) {
    return step(result);
  }

  return step(result, f(input));
};

export const filter = <a, F, c>(
  p: (x: a) => boolean
): transducer<a, a, F, c> => (step) => (
  result: $<F, [c]> = undefined,
  input: a = undefined
) => {
  if (result === undefined) {
    return step();
  }
  if (input === undefined) {
    return step(result);
  }

  if (p(input)) {
    return step(result, input);
  } else {
    return result;
  }
};

// const flatmapping = <a, b>(f: (x: a) => any) => (r) => (result, value) =>
//   r(result, f(value));

const take = <a, F, c>(n: number): transducer<a, a, F, c> => (step) => {
  let taken = 0;
  return (result = undefined, value = undefined) => {
    if (result === undefined) {
      return step();
    }
    if (value === undefined) {
      return step(result);
    }
    if (taken === n) {
      return step(result);
    }
    taken++;
    return step(result, value);
  };
};

// repeat
// partition
// taking-while
