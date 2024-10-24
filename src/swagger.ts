import { INestApplication } from '@nestjs/common';
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';

export function setupSwagger(app: INestApplication): void {
    const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dist/swagger.json'), 'utf8'));
    app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}