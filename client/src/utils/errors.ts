const extractErrorMessage = (error: any) => {
  const errorMessage =
    error?.graphQLErrors[0]?.extensions?.originalError?.message ||
    error?.graphQLErrors[0]?.message ||
    error?.networkError?.result?.errors[0]?.message ||
    error?.message ||
    error;

  if (Array.isArray(errorMessage)) {
    return formatErrorMessage(errorMessage[0]);
  }
  return formatErrorMessage(errorMessage);
};

const formatErrorMessage = (errorMessage: string | unknown) => {
  if (typeof errorMessage !== "string") {
    return "";
  }

  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};

export { extractErrorMessage };
