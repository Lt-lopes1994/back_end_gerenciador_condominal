import { Document } from 'mongoose';

//* O export interface Condominium extends Document é o que vai ser usado para criar o modelo do banco de dados
//* e também para validar os dados que serão inseridos no banco de dados.
//* O schema é um objeto que define a estrutura dos documentos que você pode armazenar no MongoDB.
//* O schema mapeia para uma coleção MongoDB e define a forma dos documentos dentro dessa coleção.
//* Os esquemas são definidos por meio de objetos que contêm as propriedades e tipos de dados
//* O ref é uma referência para o model User para que o mongoose saiba que o campo user é uma referência para o model User
export interface Condominium extends Document {
  name: string;
  streetNumber: number;
  streetName: string;
  neighborhood: string;
  city: string;
  activebit: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  user: string;
}
