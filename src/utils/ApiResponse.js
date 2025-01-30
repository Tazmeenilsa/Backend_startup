// This function creates a standardized API response object
const ApiResponse = (statusCode, data, message = 'Success') => {
    return {
        statusCode,  // HTTP status code (e.g., 200 for success, 400+ for errors)
        data,        // The actual response data
        message,     // A message indicating success or failure
        success: statusCode < 400 // Success is true if the status code is below 400 (2xx and 3xx are success responses)
    };
};

// Export the function so it can be used in other files
export { ApiResponse };
