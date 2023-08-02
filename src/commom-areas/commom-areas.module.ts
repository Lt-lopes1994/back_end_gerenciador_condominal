import { Module } from '@nestjs/common';
import { CommomAreasService } from './commom-areas.service';
import { CommomAreasController } from './commom-areas.controller';

@Module({
  controllers: [CommomAreasController],
  providers: [CommomAreasService]
})
export class CommomAreasModule {}
