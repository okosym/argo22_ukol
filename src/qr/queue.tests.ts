import { describe, test, expect } from '@jest/globals';
import { Queue } from './queue';
import { QueueItem } from './dtos/queue-item';
import { v4 as uuid } from 'uuid';
import { StatusEnum } from './dtos/status.enum';

describe('Queue Tests', () => {
    test('insert() -> valid item -> OK', async () => {
        // Arrange
        const queue = new Queue();
        const id = uuid();
        const item = new QueueItem(id,
            'data:image/png;base64,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',
             StatusEnum.PENDING); 

        // Act
        const result = await queue.insert(item);
        // Assert
        expect(result.success);

        // Act_2
        const result2 = await queue.getById(id);
        // Assert_2
        expect(result2.success);
        expect(result2.data).toEqual(item);

        // Act_3
        const result3 = await queue.updateStatus(id, StatusEnum.VALID);
        // Assert_3
        expect(result3.success);
        const result4 = await queue.getById(id);
        expect(result4.success);
        expect(result4.data!.status).toEqual(StatusEnum.VALID);
    });

});


