import { Module } from "@nestjs/common";
import { QrController } from "./qr.controller";
import { SharedModule } from "../shared/shared.module";

@Module({
    controllers: [QrController],
    imports: [SharedModule]
})
export class QrModule {}