import { Test, TestingModule } from '@nestjs/testing';
import { CommomAreasService } from './commom-areas.service';

describe('CommomAreasService', () => {
  let service: CommomAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommomAreasService],
    }).compile();

    service = module.get<CommomAreasService>(CommomAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
