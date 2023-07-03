import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateNewsDto {
  @ApiProperty({
    type: 'string',
    description: 'URL da imagem da notícia',
    example:
      'https://www.google.com.br/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  })
  ULRimage: string;

  @ApiProperty({
    type: 'string',
    description: 'Texto alternativo da imagem',
    example: 'Logo do Google',
  })
  alt: string;

  @ApiProperty({
    type: 'string',
    description: 'Título da notícia',
    example: 'Google lança novo logo',
  })
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'Conteúdo da notícia',
    example: 'O Google lançou um novo logo',
  })
  content: string;

  @ApiProperty({
    type: 'string',
    description: 'Id do usuário que criou a notícia. Id do mongoose',
    example: '1649dba614ebd94fde3399582',
  })
  user: string;
}
