import { NestFactory } from "@nestjs/core";
import { QrModule } from "./qr/qr.module";

async function bootstrap() {
    const app = await NestFactory.create(QrModule);
    await app.listen(3000);
}
bootstrap();