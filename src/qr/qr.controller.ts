import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UploadQrDTO } from "./dtos/upload-qr.dto";
import { Result } from "../shared/result";
import { ValidationService } from "../shared/validation.service";
import { QrFacade } from "./qr.facade";
import { StatusEnum } from "./dtos/status.enum";
import { plainToClass } from "class-transformer";

@Controller('qr')
export class QrController {
    // Constructor
    constructor(
        private _validationService: ValidationService,
        private _qrFacade: QrFacade
    ) {}

    @Post('upload')
    async upload(@Body() body: UploadQrDTO): Promise<Result<string>> {
        // validate body
        const obj = plainToClass(UploadQrDTO, body);
        const validationResult: Result = await this._validationService.validate(obj);
        if (!validationResult.success)
            return Result.fail<string>(validationResult.errors);

        // call facade method
        const result = await this._qrFacade.upload(obj);
        
        // return result
        return result;
    }

    @Get('getResult/:id')
    async getResult(@Param('id') id: string): Promise<Result<StatusEnum>> {
        // validate id
        const validationResult: Result = this._validationService.validateUUID(id, 'id');
        if (!validationResult.success)
            return Result.fail<StatusEnum>(validationResult.errors);
        
        // call facade method
        const result: Result<StatusEnum> = await this._qrFacade.getResult(id);
        
        // return result
        return result;
    }
}