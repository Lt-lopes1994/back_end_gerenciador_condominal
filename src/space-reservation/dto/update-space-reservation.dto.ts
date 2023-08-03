import { PartialType } from '@nestjs/swagger';
import { CreateSpaceReservationDto } from './create-space-reservation.dto';

export class UpdateSpaceReservationDto extends PartialType(
  CreateSpaceReservationDto,
) {
  date?: Date;
  message?: string;
  people?: number;
  time?: string;
  activebit?: boolean;
}
