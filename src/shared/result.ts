export class Result<T = void> {
    // Properties
    success: boolean;
    errors: string[] = [];
    data?: T;

    // Constructor
    private constructor(success: boolean, errorMessages: string[], data?: T) {
        this.success = success;
        if (data)
            this.data = data;
        if (errorMessages)
            this.errors = errorMessages;
    }

    // Methods - factory methods
    // Overloaded method signatures
    static success(): Result;
    static success<T>(data: T): Result<T>;
    // Overloaded method implementation
    static success<T>(data?: T): Result<T | void> {
        return new Result<T | void>(true, [], data);
    }

    // Overloaded method signatures
    static fail(errormessages: string[]): Result;
    static fail<T>(errorMessages: string[]): Result<T>;
    // Overloaded method implementation
    static fail<T>(errorMessages: string[]): Result<T | void> {
        return new Result<T | void>(false, errorMessages);
    }

    // Methods
    getData(): T {
        return this.data as T;
    }
}
