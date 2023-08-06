export function isArrayContained(arr1: string[], arr2: readonly string[]) {
  return arr1.every((element) => arr2.includes(element));
}
