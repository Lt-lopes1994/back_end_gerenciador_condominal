import { PartialType } from '@nestjs/swagger';
import { CreateCommomAreaDto } from './create-commom-area.dto';

export class UpdateCommomAreaDto extends PartialType(CreateCommomAreaDto) {}
