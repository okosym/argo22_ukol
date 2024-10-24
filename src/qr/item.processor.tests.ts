import { describe, test, expect } from '@jest/globals';
import { QrDecoder } from './qr.decoder';
import { Queue } from './queue';
import { ItemProcessor } from './item.processor';
import { QueueItem } from './dtos/queue-item';
import { v4 as uuid } from 'uuid';
import { StatusEnum } from './dtos/status.enum';


describe('ItemProcessor Tests', () => {
    test("_isValidDateFormat() -> '2024-10-24' -> OK", async () => {
        // Arrange
        const itemProcessor = new ItemProcessor(new QrDecoder(), new Queue());
        const str = '2024-10-24';

        // Act
        const isValid: boolean = itemProcessor._isValidDateFormat(str);

        // Assert
        expect(isValid);
    });

    test("_isValidDateFormat() -> '2024-99-99' -> FAIL", async () => {
        // Arrange
        const itemProcessor = new ItemProcessor(new QrDecoder(), new Queue());
        const str = '2024-99-99';

        // Act
        const isValid: boolean = itemProcessor._isValidDateFormat(str);

        // Assert
        expect(isValid == false);
    });

    test("_isDateExpired() -> '2000-01-01' -> OK", async () => {
        // Arrange
        const itemProcessor = new ItemProcessor(new QrDecoder(), new Queue());
        const str = '2000-01-01';

        // Act
        const expired: boolean = itemProcessor._isDateExpired(str);

        // Assert
        expect(expired);
    });

    test("_isDateExpired() -> '2099-01-01' -> FAIL", async () => {
        // Arrange
        const itemProcessor = new ItemProcessor(new QrDecoder(), new Queue());
        const str = '2099-01-01';

        // Act
        const expired: boolean = itemProcessor._isDateExpired(str);

        // Assert
        expect(expired == false);
    });

    test("_isDateExpired() -> today -> FAIL", async () => {
        // Arrange
        const itemProcessor = new ItemProcessor(new QrDecoder(), new Queue());
        const today = new Date();
        const str = today.toISOString().split('T')[0];

        // Act
        const expired: boolean = itemProcessor._isDateExpired(str);

        // Assert
        expect(expired == false);
    });

    test("process() -> FAIL test -> OK", async () => {
        // Arrange
        const queue = new Queue();
        const id = uuid();
        const queueItem = new QueueItem(id, 'invalid', StatusEnum.PENDING);
        const insertResult = await queue.insert(queueItem);
        expect(insertResult.success);

        const itemProcessor = new ItemProcessor(new QrDecoder(), queue);

        // Act
        await itemProcessor.process(queueItem);
        
        // Assert
        const getResult = await queue.getById(id);
        expect(getResult.success);
        expect(getResult.data!.status).toEqual(StatusEnum.FRAUD);
    });

    test("process() -> EXPIRED test -> OK", async () => {
        // Arrange
        const queue = new Queue();
        const id = uuid();
        const queueItem = new QueueItem(id, 'data:image/png;base64,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', StatusEnum.PENDING);
        const insertResult = await queue.insert(queueItem);
        expect(insertResult.success);

        const itemProcessor = new ItemProcessor(new QrDecoder(), queue);

        // Act
        await itemProcessor.process(queueItem);
        
        // Assert
        const getResult = await queue.getById(id);
        expect(getResult.success);
        expect(getResult.data!.status).toEqual(StatusEnum.EXPIRED);
    });

    test("process() -> VALID test -> OK", async () => {
        // Arrange
        const queue = new Queue();
        const id = uuid();
        const queueItem = new QueueItem(id, 'data:image/png;base64,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', StatusEnum.PENDING);
        const insertResult = await queue.insert(queueItem);
        expect(insertResult.success);

        const itemProcessor = new ItemProcessor(new QrDecoder(), queue);

        // Act
        await itemProcessor.process(queueItem);
        
        // Assert
        const getResult = await queue.getById(id);
        expect(getResult.success);
        expect(getResult.data!.status).toEqual(StatusEnum.VALID);
    });

});


