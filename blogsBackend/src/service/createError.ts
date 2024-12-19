export const createError = (
  message: string,
  statusCode: number,
  errCode: string
) => {
  const error: any = new Error(message);
  error.status = statusCode;
  error.code = errCode;
  return error;
};
