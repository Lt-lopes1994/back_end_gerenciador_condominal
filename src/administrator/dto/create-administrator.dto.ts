import { ApiProperty } from "@nestjs/swagger";

export class CreateAdministratorDto {
    @ApiProperty({
        type: 'number',
        description: 'CNPJ da administradora',
        example: '00.000.000/0001-00',
    })
    readonly cnpj: number;

    @ApiProperty({
        type: 'string',
        description: 'Nome do responsável',
        example: 'Louis Lane',
    })
    readonly contactPerson: string;

    @ApiProperty({
        type: 'string',
        description: 'Email do responsável',
        example: 'louislane@gmail.com'
    })
    readonly email: string;

    @ApiProperty({
        type: 'number',
        description: 'Inscrição Estadual',
        example: '000.000.000.000'
    })
    readonly ie: number;

    @ApiProperty({
        type: 'number',
        description: 'Telefone para contato',
        example: '(11) 9 9999-9999'
    })
    readonly phone: number;

    @ApiProperty({
        type: 'number',
        description: 'WhatsApp para contato',
        example: '(11) 9 9999-9999'
    })
    readonly whatsApp: number;

    @ApiProperty({
        type: 'string',
        description: 'Site da administradora',
        example: 'www.exemplo.com.br'
    })
    readonly website: string;

    readonly activebit: boolean;
}