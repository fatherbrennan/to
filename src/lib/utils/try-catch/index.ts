export type TryCatchOnTryFn<T> = () => T;
export type TryCatchOnTryAsyncFn<T> = () => Promise<T>;
export type TryCatchOnCatchFn<C> = (error: unknown) => C;
export type TryCatchOnCatchAsyncFn<C> = (error: unknown) => Promise<C>;

export function tryCatch<T, C>(onTry: TryCatchOnTryFn<T>, onCatch: TryCatchOnCatchFn<C>): T | C;
export function tryCatch<T, C>(onTry: TryCatchOnTryAsyncFn<T>, onCatch: TryCatchOnCatchAsyncFn<C>): Promise<T | C>;
export function tryCatch<T, C>(onTry: TryCatchOnTryAsyncFn<T>, onCatch: TryCatchOnCatchFn<C>): Promise<T> | C;
export function tryCatch<T, C>(onTry: TryCatchOnTryFn<T>, onCatch: TryCatchOnCatchAsyncFn<C>): T | Promise<C>;
export function tryCatch<T, C>(
  onTry: TryCatchOnTryFn<T> | TryCatchOnTryAsyncFn<T>,
  onCatch: TryCatchOnCatchFn<C> | TryCatchOnCatchAsyncFn<C>,
): T | C | Promise<T> | Promise<C> | Promise<T | C> {
  try {
    const result = onTry();
    return result instanceof Promise ? result.catch(onCatch) : result;
  } catch (error) {
    return onCatch(error);
  }
}
