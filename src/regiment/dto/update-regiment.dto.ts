import { PartialType } from '@nestjs/swagger';
import { CreateRegimentDto } from './create-regiment.dto';

export class UpdateRegimentDto extends PartialType(CreateRegimentDto) {}
