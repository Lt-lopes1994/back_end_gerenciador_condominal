import { Test, TestingModule } from '@nestjs/testing';
import { SpaceReservationService } from './space-reservation.service';

describe('SpaceReservationService', () => {
  let service: SpaceReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceReservationService],
    }).compile();

    service = module.get<SpaceReservationService>(SpaceReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
