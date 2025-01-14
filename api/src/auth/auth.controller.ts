import { Controller, Get,  Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/callback')
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const token = await this.authService.oAuthLogin(req.user);
      const FRONTEND_URL = process.env.FRONTEND_URL; 
      res.redirect(`${FRONTEND_URL}/oauth?token=${token.jwt}`);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }

}
