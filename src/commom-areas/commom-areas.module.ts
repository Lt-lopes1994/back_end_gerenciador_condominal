import { Module } from '@nestjs/common';
import { CommomAreasService } from './commom-areas.service';
import { CommomAreasController } from './commom-areas.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommomAreaSchema } from './entities/common-area.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forFeature([
      { name: 'CommomArea', schema: CommomAreaSchema },
    ]),
  ],
  controllers: [CommomAreasController],
  providers: [CommomAreasService],
  exports: [CommomAreasService],
})
export class CommomAreasModule {}
