import { Test, TestingModule } from '@nestjs/testing';
import { MotherduckController } from './motherduck.controller';

describe('MotherduckController', () => {
  let controller: MotherduckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotherduckController],
    }).compile();

    controller = module.get<MotherduckController>(MotherduckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
