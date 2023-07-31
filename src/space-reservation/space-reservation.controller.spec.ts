import { Test, TestingModule } from '@nestjs/testing';
import { SpaceReservationController } from './space-reservation.controller';
import { SpaceReservationService } from './space-reservation.service';

describe('SpaceReservationController', () => {
  let controller: SpaceReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceReservationController],
      providers: [SpaceReservationService],
    }).compile();

    controller = module.get<SpaceReservationController>(SpaceReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
