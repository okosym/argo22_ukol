import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UploadQrDTO } from "./dtos/upload-qr.dto";

@Controller('qr')
export class QrController {
    @Post('upload')
    upload(@Body() body: UploadQrDTO): string {
        return 'guid';
    }

    @Get('getResult/:id')
    getResult(@Param('id') id: string): string {
        return `Hello World! ${id}`;
    }

}