const NotFoundError = new Error('Resource not found');
NotFoundError.status = 404;
export default NotFoundError;