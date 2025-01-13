import { Module } from '@nestjs/common';
import { AirbyteService } from './airbyte.service';
import { ConfigModule } from '@nestjs/config';
import { AirbyteController } from './airbyte.controller';

@Module({
    providers: [AirbyteService],
    imports: [ConfigModule.forRoot({
        isGlobal: true, 
      })],
    controllers: [AirbyteController]
})

export class AirbyteModule {}