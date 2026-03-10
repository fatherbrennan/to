export type SrSuccess<T> = {
  data: T;
  message: string;
  success: true;
};

export type SrFailure = {
  data: undefined;
  message: string;
  success: false;
};

export type SrParamSuccess<T> = {
  data: T;
  message: string;
  success: true;
};

export type SrParamFailure = {
  message: string;
  success: false;
};

export type Sr<T> = SrSuccess<T> | SrFailure;
export type SrParam<T> = SrParamSuccess<T> | SrParamFailure;

/** standard response. */
export function sr<T>(response: SrParamSuccess<T>): SrSuccess<T>;
export function sr(response: SrParamFailure): SrFailure;
export function sr<T>(response: SrParam<T>): Sr<T> {
  const { message, success } = response;
  return success === true
    ? ({
        data: response.data,
        message: message,
        success: true,
      } satisfies SrSuccess<T>)
    : ({
        data: undefined,
        message: message,
        success: false,
      } satisfies SrFailure);
}

/** check if the value is a standard response. */
export const isSr = (v: unknown): v is SrSuccess<unknown> | SrFailure => {
  return (
    v !== null
    && typeof v === 'object'
    && Object.keys(v).length === 3
    && 'success' in v
    && 'data' in v
    && 'message' in v
  );
};

/** check if the value is a standard response, and is a success. */
export const isSrSuccess = (v: unknown): v is SrSuccess<unknown> => {
  return isSr(v) === true && v.success === true && typeof v.message === 'string';
};

/** check if the value is a standard response, and is a failure. */
export const isSrFailure = (v: unknown): v is SrFailure => {
  return isSr(v) === true && v.success === false && v.data === undefined && typeof v.message === 'string';
};

/** return the first row, or null if there is no row. */
export const firstRow = <T extends unknown[]>(r: T): T[0] | null => {
  return r[0] ?? null;
};

/** simple helper function to set and get a message. */
export const message = (fallbackFailureMessage: string) => {
  let m = fallbackFailureMessage;

  return {
    /** get the message. */
    getMessage: () => m,
    /** set the message. return new message. */
    setMessage: <T extends string>(newMessage: T) => {
      m = newMessage;
      return newMessage;
    },
    /** set the message and throw the error. */
    setMessageAndThrow: (newMessage: string, error: unknown) => {
      m = newMessage;
      throw error;
    },
    /** use the message from a `r` failure response. otherwise, use the fallback message, and throw the error */
    setMessageAndThrowFromSrFailure: (error: unknown) => {
      m = isSrFailure(error) ? error.message : fallbackFailureMessage;
      throw error;
    },
  };
};
