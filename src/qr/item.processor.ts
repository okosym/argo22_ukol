import { Result } from "../shared/result";
import { QueueItem } from "./dtos/queue-item";
import { StatusEnum } from "./dtos/status.enum";
import { QrDecoder } from "./qr.decoder";
import { Queue } from "./queue";

export class ItemProcessor {

    // Constructor
    constructor(
        private _qrDecoder: QrDecoder,
        private _queue: Queue
    ) { }

    // Methods
    async process(queueItem: QueueItem): Promise<void> {

        try {
            // decode value from qr string
            var result: Result<string> = await this._qrDecoder.decode(queueItem.data);
            if (!result.success) { // if error -> update status to FRAUD
                await this._queue.updateStatus(queueItem.id, StatusEnum.FRAUD);
                return;
            }
            var decodedValue: string = result.getData();

            // check if valid format
            var isValidDateFormat = this._isValidDateFormat(decodedValue);
            if (!isValidDateFormat) { // if invalid -> update status to FRAUD
                await this._queue.updateStatus(queueItem.id, StatusEnum.FRAUD);
                return;
            }

            // check if expired
            var isExpired = this._isDateExpired(decodedValue);
            if (isExpired) { // if expired -> update status to EXPIRED
                await this._queue.updateStatus(queueItem.id, StatusEnum.EXPIRED);
                return;
            }

            // if valid -> update status to VALID
            await this._queue.updateStatus(queueItem.id, StatusEnum.VALID);
        } catch (error) {
            // TODO: if error -> log somewhere
        }
    }

    public _isValidDateFormat(dateStr: string): boolean {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateStr))
            return false;
        
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) 
            return false;
        
        return dateStr === date.toISOString().split('T')[0];
    }

    public _isDateExpired(dateStr: string): boolean {
        const date = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to midnight to compare only the date part
        return date < today;
    }
}