import { validate, ValidationError, ValidatorOptions } from "class-validator";
import { Result } from "./result";
import { isUUID } from "class-validator";

export class ValidationService {
    
    // Methods
    async validate<T extends object>(obj: T): Promise<Result> {
        // validate the object
        const validationErrors: ValidationError[] = await validate(obj, {
            skipUndefinedProperties: false,
            skipNullProperties: false,
            skipMissingProperties: false,
            forbidNonWhitelisted: true,
            stopAtFirstError: false
            
        });

        // parse ValidationError[] to string[]
        const errors = this._getErrorMessages(validationErrors);

        // if errors -> return fail result
        if (errors.length > 0) 
            return Result.fail(errors);

        // return ok result
        return Result.success();
    }

    validateUUID(str: string, name: string): Result {
        if (!str) 
            return Result.fail([`${name}: ${name} is empty`]);
        
        if (!isUUID(str)) 
            return Result.fail([`${name}: ${name} is not valid UUID`]);
        
        return Result.success();
    }

    private _getErrorMessages(errors: ValidationError[], parentPath: string = ''): string[] {
        let messages: string[] = [];
        for (const error of errors) {
            const propertyPath = parentPath ? `${parentPath}.${error.property}` : error.property;
            if (error.constraints) {
                messages = messages.concat(
                    Object.values(error.constraints).map(
                        (msg) => `${propertyPath}: ${msg}`
                    )
                );
            }
            if (error.children && error.children.length > 0) {
                messages = messages.concat(this._getErrorMessages(error.children, propertyPath));
            }
        }
        return messages;
    }
}