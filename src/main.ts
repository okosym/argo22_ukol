import { NestFactory } from "@nestjs/core";
import { QrModule } from "./qr/qr.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { setupSwagger } from "./swagger";

async function bootstrap() {
    const app = await NestFactory.create(QrModule);

    // setup Swagger
    setupSwagger(app);

    await app.listen(3000);
}
bootstrap();