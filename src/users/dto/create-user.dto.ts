import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    description: 'Nome do usuário',
    example: 'jane Doe',
  })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    description: 'Email do usuário',
    example: 'janedoe@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    type: 'string',
    description: 'Senha do usuário',
    example: '12345678',
  })
  password: string;

  @ApiProperty({
    type: 'string',
    description: 'Confirmação da senha do usuário',
    example: '12345678',
  })
  readonly passwordConfirm: string;

  @ApiProperty({
    type: 'string',
    description: 'Número do apartamento do usuário',
    example: '123',
  })
  readonly door: number;

  @ApiProperty({
    type: 'string',
    description: 'Número ou nome do bloco do usuário',
    example: 'A',
  })
  readonly tower: string;

  @ApiProperty({
    type: 'string',
    description: 'Código do condóminio do usuário',
    example: '123456'
  })
  readonly condominiumCode: string;

  readonly activebit: boolean;
}
