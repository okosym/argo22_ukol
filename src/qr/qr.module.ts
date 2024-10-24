import { Module } from "@nestjs/common";
import { QrController } from "./qr.controller";
import { SharedModule } from "../shared/shared.module";
import { QrFacade } from "./qr.facade";

@Module({
    controllers: [QrController],
    providers: [QrFacade],
    imports: [SharedModule]
})
export class QrModule {}