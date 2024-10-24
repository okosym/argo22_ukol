import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UploadQrDTO } from "./dtos/upload-qr.dto";
import { Result } from "../shared/result";
import { ValidationService } from "../shared/validation.service";

@Controller('qr')
export class QrController {
    // Constructor
    constructor(private _validationService: ValidationService) { }

    @Post('upload')
    async upload(@Body() body: UploadQrDTO): Promise<Result<string>> {
        // validate body
        const validationResult: Result = await this._validationService.validate(body);
        if (!validationResult.success)
            return this._createResult(Result.fail<string>(validationResult.errors));

        // return success result
        return this._createResult(Result.success(body.qr));
    }

    @Get('getResult/:id')
    getResult(@Param('id') id: string): Result<string> {
        // validate id
        const validationResult: Result = this._validationService.validateUUID(id, 'id');
        if (!validationResult.success)
            return this._createResult(Result.fail<string>(validationResult.errors));
        
        return this._createResult(Result.success(id));
    }

    // if(result.success == true) -> return 200 (http code), otherwise return 500 (http code)
    private _createResult<T>(result: Result<T>) {
        if (result.success)
            return result;
        else
            throw new BadRequestException(result);
    }

}