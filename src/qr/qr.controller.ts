import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UploadQrDTO } from "./dtos/upload-qr.dto";
import { Result } from "../shared/result";
import { ValidationService } from "../shared/validation.service";
import { QrFacade } from "./qr.facade";

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
        const validationResult: Result = await this._validationService.validate(body);
        if (!validationResult.success)
            return Result.fail<string>(validationResult.errors);

        // call facade method
        const result = await this._qrFacade.upload(body);
        
        // return result
        return result;
    }

    @Get('getResult/:id')
    async getResult(@Param('id') id: string): Promise<Result<string>> {
        // validate id
        const validationResult: Result = this._validationService.validateUUID(id, 'id');
        if (!validationResult.success)
            return Result.fail<string>(validationResult.errors);
        
        // call facade method
        const result = await this._qrFacade.getResult(id);
        
        // return result
        return result;
    }

    // // if(result.success == true) -> return 200 (http code), otherwise return 500 (http code)
    // private _createResult<T>(result: Result<T>) {
    //     if (result.success)
    //         return result;
    //     else
    //         throw new BadRequestException(result);
    // }

}