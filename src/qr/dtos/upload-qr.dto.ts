import { IsBase64, IsNotEmpty, IsString } from "class-validator";

export class UploadQrDTO {
    
    // Properties
    @IsNotEmpty() @IsString() @IsBase64()
    qr!: string;
}