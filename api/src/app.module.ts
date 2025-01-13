import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirbyteModule } from './airbyte/airbyte.module';
import { MotherduckModule } from './motherduck/motherduck.module';

@Module({
  imports: [AirbyteModule, MotherduckModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
