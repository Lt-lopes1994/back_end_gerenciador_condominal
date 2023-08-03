import { Test, TestingModule } from '@nestjs/testing';
import { RegimentService } from './regiment.service';

describe('RegimentService', () => {
  let service: RegimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegimentService],
    }).compile();

    service = module.get<RegimentService>(RegimentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
