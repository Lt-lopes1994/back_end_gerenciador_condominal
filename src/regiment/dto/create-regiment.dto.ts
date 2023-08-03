import { ApiProperty } from '@nestjs/swagger';

export class CreateRegimentDto {
    @ApiProperty({
        type: 'string',
        description: 'Nome do arquivo',
        example: 'arquivo.pdf'
    })
    failename: string
}
