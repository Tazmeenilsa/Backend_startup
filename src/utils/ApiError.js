// This function creates an error object similar to a class-based error.
function ApiError(statusCode, stack, message = "Something went wrong", errors = []) {
    // Create a new Error object with the given message
    const error = new Error(message);

    // Add a custom status code property to indicate the HTTP error status
    error.statusCode = statusCode;

    // A placeholder for additional data (not used here, but can be used if needed)
    error.data = null;

    // Set success to false because this represents an error
    error.success = false;

    // Store an array of possible error details/messages
    error.errors = errors;

    // If a stack trace is provided, use it; otherwise, generate one
    if (stack) {
        error.stack = stack; // Use the provided stack trace
    } else {
        // Capture the stack trace for debugging (removes function calls above this one)
        Error.captureStackTrace(error, ApiError);
    }

    // Return the customized error object
    return error;
}

// Export the function so it can be used in other files
export { ApiError };
