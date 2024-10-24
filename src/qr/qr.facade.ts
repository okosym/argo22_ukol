import { Result } from "../shared/result";
import { QueueItem } from "./dtos/queue-item";
import { UploadQrDTO } from "./dtos/upload-qr.dto";
import { Queue } from "./queue";
import { v4 as uuid } from 'uuid';
import { ItemProcessor } from "./item.processor";
import { StatusEnum } from "./dtos/status.enum";
import { Injectable } from "@nestjs/common";

@Injectable()
export class QrFacade {

    // Constructor
    constructor(
        private _queue: Queue,
        private _itemProcessor: ItemProcessor
    ) {}
    
    async upload(inputDTO: UploadQrDTO): Promise<Result<string>> {
        // save item to queue
        const id = uuid();
        const item = new QueueItem(id, inputDTO.qr, StatusEnum.PENDING);
        const enqueueResult: Result = await this._queue.insert(item);
        if (!enqueueResult.success) 
            return Result.fail<string>(enqueueResult.errors);

        // start processing item asynchronously (do not wait for it to finish)
        this._itemProcessor.process(item);

        // return id
        return Result.success(id);
    }
    
    async getResult(id: string): Promise<Result<StatusEnum>> {
        // get item by id
        const getResult = await this._queue.getById(id);
        if (getResult.success == false)
            return Result.fail<StatusEnum>(getResult.errors);
        const item: QueueItem = getResult.getData();

        // return status
        return Result.success(item.status);
    }

}