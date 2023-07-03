import { ApiProperty } from '@nestjs/swagger';

//* O nosso DTO é uma classe simples que contém apenas propriedades e seus tipos.
//* Nosso DTO é um exemplo do que recebemos do nosso cliente (vindo do front end Body).
//* O decorator @ApiProperty() é usado para descrever a propriedade e, portanto,
//* o Swagger pode gerar a documentação corretamente.
export class CreateCondominiumDto {
  @ApiProperty({
    type: 'string',
    description: 'Nome do condomínio',
    example: 'Condomínio do Edifício',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Número do condomínio',
    example: '123',
  })
  readonly streetNumber: number;

  @ApiProperty({
    type: 'string',
    description: 'Nome da rua do condomínio',
    example: 'Rua do Edifício',
  })
  readonly streetName: string;

  @ApiProperty({
    type: 'string',
    description: 'Nome do bairro do condomínio',
    example: 'Bairro do Edifício',
  })
  readonly neighborhood: string;

  @ApiProperty({
    type: 'string',
    description: 'Nome da administradora e/ou sindico do condomínio',
    example: 'Cidade do Edifício',
  })
  readonly city: string;

  @ApiProperty({
    type: 'string',
    description: 'Id do usuário que está criando o condomínio',
    example: '60f4b4b3d9b3f1b3b4f9b0b3',
  })
  readonly user: string;

  activebit: boolean;
}
