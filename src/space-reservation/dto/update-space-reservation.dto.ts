import { PartialType } from "@nestjs/swagger";
import { CreateSpaceReservationDto } from "./create-space-reservation.dto";

export class UpdateSpaceReservationDto extends PartialType(CreateSpaceReservationDto){
    commonAreaId?: string;
    date?: Date;
    email?: string;
    message?: string;
    name?: string;
    people?: number;
    phone?: string;
    time?: string;
    activebit?: boolean;
}