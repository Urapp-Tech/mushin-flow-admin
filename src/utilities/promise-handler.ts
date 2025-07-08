/* eslint-disable @typescript-eslint/no-explicit-any */

export default function promiseHandler<T, U = any>(
  promise: Promise<T>,
  onfinally?: (() => void) | null | undefined
) {
  return promise
    .then<readonly [null, T, true]>((result) => [null, result, true] as const)
    .catch<readonly [U, null, false]>((error) => [error, null, false] as const)
    .finally(onfinally);
}
