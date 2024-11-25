class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  /**
   * Creates an instance of ApiError
   * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500)
   * @param {string} message - Human-readable error message
   * @param {boolean} [isOperational=true] - Whether the error is operational
   */
  constructor(statusCode: number, message: string, isOperational = true) {
    super(message); // Calls the parent Error class constructor
    this.statusCode = statusCode;
    this.isOperational = isOperational; // Default to true for expected errors
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
  }
}

export default ApiError;
