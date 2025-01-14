import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DrizzleModule } from '@app/drizzle';
import { JwtGuardStrategy } from './guards/jwt-auth.strategy';
import { JwtGuard } from './guards/jwt-auth.guard';
import { GoogleStrategy } from './guards/google-oauth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
imports: [DrizzleModule,
  ConfigModule.forRoot({isGlobal: true}),
  JwtModule.registerAsync({
  useFactory: () => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '3d',
    },
    global: true,
  }),
}),],
  controllers: [AuthController],
  providers: [AuthService,JwtGuardStrategy, JwtGuard, GoogleStrategy]
})

export class AuthModule {}
