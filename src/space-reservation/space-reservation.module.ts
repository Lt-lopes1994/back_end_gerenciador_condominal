import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceReservationSchema } from './entities/space-reservation.schema';
import { SpaceReservationController } from './space-reservation.controller';
import { SpaceReservationService } from './space-reservation.service';
import { CondominiumModule } from 'src/condominium/condominium.module';
import { CommomAreasModule } from 'src/commom-areas/commom-areas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forFeature([
      { name: 'SpaceReservation', schema: SpaceReservationSchema },
    ]),
    CommomAreasModule,
    CondominiumModule,
  ],
  controllers: [SpaceReservationController],
  providers: [SpaceReservationService],
  exports: [SpaceReservationService],
})
export class SpaceReservationModule {}
