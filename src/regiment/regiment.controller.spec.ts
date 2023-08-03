import { Test, TestingModule } from '@nestjs/testing';
import { RegimentController } from './regiment.controller';
import { RegimentService } from './regiment.service';

describe('RegimentController', () => {
  let controller: RegimentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegimentController],
      providers: [RegimentService],
    }).compile();

    controller = module.get<RegimentController>(RegimentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
