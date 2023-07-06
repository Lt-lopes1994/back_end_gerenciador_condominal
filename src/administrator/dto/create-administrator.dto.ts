import { ApiProperty } from "@nestjs/swagger";

export class CreateAdministratorDto {
    @ApiProperty({
        type: 'string',
        description: 'CNPJ da administradora',
        example: '000111222000133',
    })
    readonly cnpj: string;

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
        type: 'string',
        description: 'Inscrição Estadual',
        example: '111222333444'
    })
    readonly ie: string;

    @ApiProperty({
        type: 'string',
        description: 'Telefone para contato',
        example: '11999999999'
    })
    readonly phone: string;

    @ApiProperty({
        type: 'string',
        description: 'WhattsApp para contato',
        example: '11999999999'
    })
    readonly whattsApp: string;

    readonly activebit: boolean;
}