import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RegimentSchema } from './entities/regiment.schema';
import { RegimentController } from './regiment.controller';
import { RegimentService } from './regiment.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forFeature([
      { name: 'Regiment', schema: RegimentSchema },
    ])
  ],
  controllers: [RegimentController],
  providers: [RegimentService]
})
export class RegimentModule { }
