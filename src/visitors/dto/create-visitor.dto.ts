import { ApiProperty } from '@nestjs/swagger/dist';

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
    readonly departure_date: Date;

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
        example: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istoedinheiro.com.br%2Fcpf%2F&psig=AOvVaw0Q7WYR8bXbQfQ0W7U1c4wV&ust=1611920115788000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjR9ZqWiu4CFQAAAAAdAAAAABAD',
    })
    readonly visitor_photo: string;

    @ApiProperty({
        type: 'string',
        description: 'Placa do veículo do visitante',
        example: 'ABC-1234',
        required: false
    })
    readonly vehicle_plate?: string;
}