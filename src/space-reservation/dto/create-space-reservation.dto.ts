import { ApiProperty } from "@nestjs/swagger";

export class CreateSpaceReservationDto {
    
    @ApiProperty({
        type: 'string',
        description: 'Nome do Local',
        example: 'Salão de festas',
    })
    readonly commonAreaId: string;

    @ApiProperty({
        type: 'date',
        description: 'Data da reserva do espaço',
        example: '01/02/23',
    })
    readonly date: Date;

    @ApiProperty({
        type: 'string',
        description: 'Email do responsável',
        example: 'joseSilva@gmail.com'
    })
    readonly email: string;

    @ApiProperty({
        type: 'string',
        description: 'Mensagem para o administrador',
        example: 'Gostaria de saber o que tem a nossa disposição no salão de festas?'
    })
    message: string;

    @ApiProperty({
        type: 'string',
        description: 'Nome do resposável pela reserva',
        example: 'José da Silva'
    })
    name: string;

    @ApiProperty({
        type: 'number',
        description: 'Quantidade de pessoas no evento',
        example: '15'
    })
    people: number;

    @ApiProperty({
        type: 'string',
        description: 'Número do telefone do respons´qavel pela reserva',
        example: '(00) 98765-4321'
    })
    phone: string;


    @ApiProperty({
        type: 'string',
        description: 'Horário do início do evento no local',
        example: '14:15'
    })
    time: string;

    readonly activebit: boolean;
}