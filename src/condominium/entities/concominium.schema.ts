import * as mongoose from 'mongoose';

//! Esse schema é o que vai ser usado para criar o modelo do banco de dados
//! e também para validar os dados que serão inseridos no banco de dados.
//! O schema é um objeto que define a estrutura dos documentos que você pode armazenar no MongoDB.
//! O schema mapeia para uma coleção MongoDB e define a forma dos documentos dentro dessa coleção.
//! Os esquemas são definidos por meio de objetos que contêm as propriedades e tipos de dados
//? O ref é uma referência para o model User para que o mongoose saiba que o campo user é uma referência para o model User
export const CondominiumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    streetNumber: { type: Number, required: true },
    streetName: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    activebit: { type: Boolean, required: true, default: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    codeCondominium: { type: String, required: true }
  },
  { timestamps: true, collection: 'condominiums' },
);
