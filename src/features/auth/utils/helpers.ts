export function isErrorWithMessage(error: unknown): error is { data: { message: string } } {
  return (
    typeof error === "object" && // Check if error is an object
    error !== null && // Ensure error is not null
    "data" in error && // Check if error has a data property
    typeof (error as { data: unknown }).data === "object" && // Check if data is an object
    (error as { data: unknown }).data !== null && // Ensure data is not null
    "message" in (error as { data: { message?: unknown } }).data && // Check if data has a message property
    typeof (error as { data: { message: unknown } }).data.message === "string" // Check if message is a string
  );
}
