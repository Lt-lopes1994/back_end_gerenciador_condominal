import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministratorSchema } from './entities/administrator.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forFeature([{ name: 'Administrator', schema: AdministratorSchema }])
  ],
  controllers: [AdministratorController],
  providers: [AdministratorService],
  exports: [AdministratorService]
})
export class AdministratorModule { }
