import { StatusEnum } from "./status.enum";

export class QueueItem {

    // Properties
    id!: string;
    data!: string;
    status!: StatusEnum;

    // Constructor
    constructor(id: string, data: string, status: StatusEnum) {
        this.id = id;
        this.data = data;
        this.status = status;
    }
}