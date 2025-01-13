import { Module } from '@nestjs/common';
import { MotherduckService } from './motherduck.service';
import { MotherduckController } from './motherduck.controller';

@Module({
  providers: [MotherduckService],
  controllers: [MotherduckController]
})
export class MotherduckModule {}
