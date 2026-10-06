import { Test, TestingModule } from '@nestjs/testing';
import { RunPointsController } from './run-points.controller.js';

describe('RunPointsController', () => {
  let controller: RunPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunPointsController],
    }).compile();

    controller = module.get<RunPointsController>(RunPointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
