import { PartialType } from '@nestjs/swagger';
import { CreateAdministratorDto } from './create-administrator.dto';

export class UpdateAdministratorDto extends PartialType(CreateAdministratorDto) {
    cnpj?: number;
    contactPerson?: string;
    email?: string;
    ie?: number;
    phone?: number;
    whatsApp?: number;
    website?: string;
    activebit?: boolean;
}