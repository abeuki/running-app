import { Test, TestingModule } from '@nestjs/testing';
import { RunPointsService } from './run-points.service.js';

describe('RunPointsService', () => {
  let service: RunPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunPointsService],
    }).compile();

    service = module.get<RunPointsService>(RunPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
