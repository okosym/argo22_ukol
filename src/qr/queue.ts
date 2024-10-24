import Database from 'better-sqlite3';
import { Result } from "../shared/result";
import { QueueItem } from "./dtos/queue-item";
import { StatusEnum } from './dtos/status.enum';

export class Queue {
    // Properties
    private _db: Database.Database;

    // Constructor
    constructor() {
        this._db = this._open();
        this._initialize();
    }

    // Private Methods
    private _open(): Database.Database {
        return new Database('queue.db', { verbose: console.log });
    }

    private _initialize(): void {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS queue (
                id TEXT PRIMARY KEY,
                data TEXT,
                status TEXT
            )
        `;
        this._db.exec(createTableQuery);
    }

    // Methods
    async insert(item: QueueItem): Promise<Result> {
        try {
            const sql = this._db.prepare('INSERT INTO queue (id, data, status) VALUES (?, ?, ?)');
            sql.run(item.id, item.data, StatusEnum.PENDING);
            return Result.success();
        } catch (error) {
            if (error instanceof Error)
                return Result.fail([error.message]);
            throw error;
        }
    }

    async getById(id: string): Promise<Result<QueueItem>> {
        try {
            const sql = this._db.prepare('SELECT * FROM queue WHERE id = ?');
            const row = sql.get(id) as QueueItem;
            if (row) {
                const item: QueueItem = {
                    id: row.id,
                    data: row.data,
                    status: row.status as StatusEnum
                };
                return Result.success(item);
            } else {
                return Result.fail<QueueItem>(['Item not found']);
            }
        } catch (error) {
            if (error instanceof Error)
                return Result.fail<QueueItem>([error.message]);
            throw error;
        }
    }

    async updateStatus(id: string, status: StatusEnum): Promise<Result> {
        try {
            const sql = this._db.prepare('UPDATE queue SET status = ? WHERE id = ?');
            const result = sql.run(status, id);
            if (result.changes > 0) {
                return Result.success();
            } else {
                return Result.fail(['Item not found or status not changed']);
            }
        } catch (error) {
            if (error instanceof Error)
                return Result.fail([error.message]);
            throw error;
        }
    }
}