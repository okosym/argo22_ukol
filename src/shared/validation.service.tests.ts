import { describe, test, expect } from '@jest/globals';
import { ValidationService } from './validation.service';
import { UploadQrDTO } from '../qr/dtos/upload-qr.dto';
import { plainToClass } from "class-transformer";

describe('ValidationService Tests', () => {
    test('validate() -> Valid obj -> OK', async () => {
        // Arrange
        const validationService = new ValidationService();
        const dto: UploadQrDTO = plainToClass(UploadQrDTO, { qr: 'MTIz' });

        // Act
        const result = await validationService.validate(dto);

        // Assert
        expect(result.success).toBeTruthy();
    });

    test('validate() -> Missing required property -> FAIL', async () => {
        // Arrange
        const validationService = new ValidationService();
        const dto: UploadQrDTO = plainToClass(UploadQrDTO, { q: '...' });

        // Act
        const result = await validationService.validate(dto);

        // Assert
        expect(result.success == false);
        const error_1 = 'qr: qr should not be empty';
        const hasError_1 = result.errors.find(x => x === error_1);
        expect(hasError_1);
    });

    test('validate() -> String property is not string -> FAIL', async () => {
        // Arrange
        const validationService = new ValidationService();
        const dto: UploadQrDTO = plainToClass(UploadQrDTO, { q: 123 });

        // Act
        const result = await validationService.validate(dto);

        // Assert
        expect(result.success == false);
        const error_1 = 'qr: qr must be a string';
        const hasError_1 = result.errors.find(x => x === error_1);
        expect(hasError_1);
    });

    test('validate() -> Base64 property is not base64 -> FAIL', async () => {
        // Arrange
        const validationService = new ValidationService();
        const dto: UploadQrDTO = plainToClass(UploadQrDTO, { qr: "123" });

        // Act
        const result = await validationService.validate(dto);

        // Assert
        expect(result.success == false);
        const error_1 = 'qr: qr must be base64 encoded';
        const hasError_1 = result.errors.find(x => x === error_1);
        expect(hasError_1);
    });

    test('validateUUID() -> correct UUID -> OK', () => {
        // Arrange
        const validationService = new ValidationService();
        const id = '123e4567-e89b-12d3-a456-426614174000';

        // Act
        const result =  validationService.validateUUID(id, 'id');

        // Assert
        expect(result.success);
    });

    test('validateUUID() -> empty string -> FAIL', () => {
        // Arrange
        const validationService = new ValidationService();
        let id = null;
        id = id as any as string;  // to avoid TS error

        // Act
        const result =  validationService.validateUUID(id, 'id');
        console.log(result);

        // Assert
        expect(result.success == false);
    });

    test('validateUUID() -> invalid string -> FAIL', () => {
        // Arrange
        const validationService = new ValidationService();
        let id = 'holahola';

        // Act
        const result =  validationService.validateUUID(id, 'id');
        console.log(result);

        // Assert
        expect(result.success == false);
    });
});
