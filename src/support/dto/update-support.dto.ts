import { PartialType } from '@nestjs/swagger';
import { CreateSupportDto } from './create-support.dto';

export class UpdateSupportDto extends PartialType(CreateSupportDto) {
    readonly name?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly tower?: string;
    readonly door?: number;
    readonly title?: string;
    readonly text_area?: string;
    readonly solved?: boolean;
}