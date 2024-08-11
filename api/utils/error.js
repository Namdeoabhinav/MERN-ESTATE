export const errorHandler = (statusCode , message) => {
    const error = new Error(); //using javascript error constructor to create an error.
    error.statusCode = statusCode;
    error.message = message;
    return error;
}