import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceReservationSchema } from './entities/space-reservation.schema';
import { SpaceReservationController } from './space-reservation.controller';
import { SpaceReservationService } from './space-reservation.service';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        MongooseModule.forFeature([{name: 'SpaceReservation', schema: SpaceReservationSchema}])],
    controllers: [SpaceReservationController],
    providers: [SpaceReservationService ],
    exports: [SpaceReservationService]
})
export class SpaceReservationModule {}
