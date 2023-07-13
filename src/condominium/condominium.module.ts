import { Module } from '@nestjs/common';
import { CondominiumService } from './condominium.service';
import { CondominiumController } from './condominium.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CondominiumSchema } from './entities/concominium.schema';

//? ConfigModule.forRoot({ envFilePath: '.env' }) é necessário para que o MongooseModule possa acessar as variáveis de ambiente
//? MongooseModule.forFeature([{ name: 'Condominium', schema: CondominiumSchema }]) é necessário para que o MongooseModule possa acessar o schema do Condominium
//? o name é o nome do model que será usado para criar o modelo do banco de dados e também para validar os dados que serão inseridos no banco de dados.
//? O schema é um objeto que define a estrutura dos documentos que você pode armazenar no MongoDB.
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forFeature([
      { name: 'Condominium', schema: CondominiumSchema },
    ]),
    UsersModule,
  ],
  controllers: [CondominiumController],
  providers: [CondominiumService],
})
export class CondominiumModule {}
