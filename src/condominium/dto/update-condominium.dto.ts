import { PartialType } from '@nestjs/swagger';
import { CreateCondominiumDto } from './create-condominium.dto';

//! O PartialType() é um utilitário que cria um tipo que torna todas as propriedades de T opcionais.
//! Isso significa que você pode ter uma instância de um tipo e alterar suas propriedades posteriormente.
//! Isso é útil ao criar DTOs para atualizar entidades.
export class UpdateCondominiumDto extends PartialType(CreateCondominiumDto) {
  name?: string;
  user?: string;
  activebit?: boolean;
}
