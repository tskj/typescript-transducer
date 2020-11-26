export const reduceList = <Coll, V>(
  reducer: (result: Coll, input: V) => Coll,
  result: Coll,
  list: V[]
): Coll => {
  if (list.length === 0) {
    return result;
  }
  const [x, ...xs] = list;
  return reduceList(reducer, reducer(result, x), xs);
};

export const concatList = <T, Coll>(step: (result: Coll, input: T) => Coll) => (
  result: Coll,
  input: T[]
) => reduceList(step, result, input);

export const conjList = <V>(list: V[], x: V): V[] => [...list, x];
