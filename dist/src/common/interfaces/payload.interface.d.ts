export interface Payload<T> {
    message: string;
    statusCode: number;
    data?: T;
}
