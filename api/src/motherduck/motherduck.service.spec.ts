import { Test, TestingModule } from '@nestjs/testing';
import { MotherduckService } from './motherduck.service';

describe('MotherduckService', () => {
  let service: MotherduckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotherduckService],
    }).compile();

    service = module.get<MotherduckService>(MotherduckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
