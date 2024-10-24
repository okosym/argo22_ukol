import { Module } from "@nestjs/common";
import { QrController } from "./qr.controller";
import { SharedModule } from "../shared/shared.module";
import { QrFacade } from "./qr.facade";
import { QrDecoder } from "./qr.decoder";
import { Queue } from "./queue";
import { ItemProcessor } from "./item.processor";

@Module({
    controllers: [QrController],
    providers: [QrFacade, QrDecoder, Queue, ItemProcessor],
    imports: [SharedModule]
})
export class QrModule {}