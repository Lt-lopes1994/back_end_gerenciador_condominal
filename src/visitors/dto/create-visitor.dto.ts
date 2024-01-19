import { ApiProperty } from '@nestjs/swagger/dist';
import { VisitorPictureDto } from './visitor-picture.dto';

export class CreateVisitorDto {
    @ApiProperty({
        type: 'string',
        description: 'Cpf do visitante',
        example: '000.000.000-00',
    })
    readonly cpf: string;

    @ApiProperty({
        type: 'string',
        description: 'Nome do visitante',
        example: 'jane Doe',
    })
    readonly name: string;

    @ApiProperty({
        type: 'string',
        description: 'Data de saída do visitante',
        example: '28-01-2021',
    })
    readonly departure_date?: Date;

    @ApiProperty({
        type: 'string',
        description: 'Motivo da visita',
        example: 'Entrega de encomenda',
    })
    readonly visit_reason: string;

    @ApiProperty({
        type: 'string',
        description: 'Nome do morador visitado',
        example: 'jane Doe',
    })
    readonly resident_name: string;

    @ApiProperty({
        type: 'number',
        description: 'Apartamento visitado',
        example: '123',
    })
    readonly door_visited: number;

    @ApiProperty({
        type: 'string',
        description: 'Bloco visitado',
        example: 'A',
    })
    readonly tower_visited: string;

    @ApiProperty({
        type: 'string',
        description: 'Foto do visitante',
        example: {
            name: 'image.jpg',
            key: '1234567890',
            url: 'http://localhost:3000/files/1234567890',
        },
    })
    readonly visitor_photo?: VisitorPictureDto;

    @ApiProperty({
        type: 'string',
        description: 'Placa do veículo do visitante',
        example: 'ABC-1234',
        required: false
    })
    readonly vehicle_plate?: string;
}