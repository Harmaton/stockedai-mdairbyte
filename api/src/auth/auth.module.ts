import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DrizzleModule } from '@app/drizzle';

@Module({
imports: [DrizzleModule],
  controllers: [AuthController],
  providers: [AuthService]
})

export class AuthModule {}
