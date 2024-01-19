import { PartialType } from '@nestjs/swagger';
import { CreateVisitorDto } from './create-visitor.dto';
import { VisitorPictureDto } from './visitor-picture.dto';

export class UpdateVisitorDto extends PartialType(CreateVisitorDto) {
    readonly cpf?: string;
    readonly name?: string;
    readonly departure_date?: Date;
    readonly visit_reason?: string;
    readonly resident_name?: string;
    readonly door_visited?: number;
    readonly tower_visited?: string;
    readonly visitor_photo?: VisitorPictureDto;
    readonly vehicle_plate?: string;
}