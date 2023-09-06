export type ApiReturnType<T> = {
    data: T;
    error: null;
} | {
    data: null,
    error: {
        status: number;
        statusText: string;
        // Can extend this as needed
    }
}