import { ApiProperty } from '@nestjs/swagger';

export class CreateRegimentDto {
    @ApiProperty({
        type: 'string',
        description: 'Nome do arquivo',
        example: 'arquivo.pdf'
    })
    fileName: string

    @ApiProperty({
        type: 'number',
        description: 'Tamanho do arquivo',
        example: '16mb ou 1600kbps'
    })
    size: number

    @ApiProperty({
        type: 'string',
        description: '.pdf',
        example: 'exemplo.pdf'
    })
    contentType: string

    @ApiProperty({
        type: 'string',
        description: 'Caminho para o arquivo',
        example: 'dominio.com/arquivo.pdf'
    })
    url: string
}
