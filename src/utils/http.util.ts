export enum HttpResponse {
    NOT_FOUND = 404,
    INTERNAL_ERROR = 404,
    BAD_REQUEST = 400,
    NOT_AUTHORIZED = 401,
    FORBIDDEN = 403
}
interface MyError extends Error {
    code: HttpResponse;
}


export class ApiError implements MyError {
    code: HttpResponse;
    name: string;
    message: string;
    stack?: string;

    constructor(code: HttpResponse, name: string, message: string, stack?: string) {
        this.code = code;
        this.name = name;
        this.message = message;
        this.stack = stack;
    }

}