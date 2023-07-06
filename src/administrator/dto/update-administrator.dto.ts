import { PartialType } from '@nestjs/swagger';
import { CreateAdministratorDto } from './create-administrator.dto';

export class UpdateAdministratorDto extends PartialType(CreateAdministratorDto) {
    cnpj?: string;
    contactPerson?: string;
    email?: string;
    ie?: string;
    phone?: string;
    whattsApp?: string;
    activebit?: boolean;
}