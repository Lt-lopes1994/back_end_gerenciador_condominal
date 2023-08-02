import { Test, TestingModule } from '@nestjs/testing';
import { CommomAreasController } from './commom-areas.controller';
import { CommomAreasService } from './commom-areas.service';

describe('CommomAreasController', () => {
  let controller: CommomAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommomAreasController],
      providers: [CommomAreasService],
    }).compile();

    controller = module.get<CommomAreasController>(CommomAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
