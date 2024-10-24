import { Result } from "../shared/result";
import { UploadQrDTO } from "./dtos/upload-qr.dto";
import { QrDecoder } from "./qr.decoder";

export class QrFacade {

    // Constructor
    constructor(private _qrDecoder: QrDecoder) {}
    
    async upload(inputDTO: UploadQrDTO): Promise<Result<string>> {
        // parse string value from qr string
        var result: Result<string> = await this._qrDecoder.decode(inputDTO.qr);
        if (!result.success) 
            return result;
        var decodedValue: string = result.getData();
            
        throw new Error("Method not implemented.");
    }
    
    async getResult(id: string): Promise<Result<string>> {
        throw new Error("Method not implemented.");
    }

}