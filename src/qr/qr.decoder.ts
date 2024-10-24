import sharp from "sharp";
import { Result } from "../shared/result";
import jsQR, { QRCode } from "jsqr";
import { Injectable } from "@nestjs/common";

@Injectable()
export class QrDecoder {
    /**
     * Decodes base64 string containing qr code to plain string
     * https://dev.to/kshyun28/how-to-reliably-read-qr-codes-in-nodejs-502i
     */
    async decode(qrBase64Str: string): Promise<Result<string>> {
        try {
            // strip out the prefix if it exists
            const base64Data = this._removePrefix(qrBase64Str);
            
            // decode base64 string to buffer
            const buffer = Buffer.from(base64Data, 'base64');

            // read the image using sharp
            const image = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });

            // decode the QR code using jsQR
            const qrCode: QRCode | null = jsQR(new Uint8ClampedArray(image.data), image.info.width, image.info.height);
            if (!qrCode)
                return Result.fail<string>(["QR code not found"]);

            // return decoded data
            return Result.success(qrCode.data);
        } catch (error) {
            if (error instanceof Error)
                return Result.fail<string>([error.message]);
            throw error;
        }
    }

    private _removePrefix(qrBase64Str: string): string {
        var str = qrBase64Str.replace(/^data:image\/.{3,4};base64,/, '');
        return str;
    }
}