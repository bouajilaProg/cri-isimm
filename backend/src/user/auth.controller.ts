import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body('userCode') userCode: string, @Body('password') password: string) {
    return this.authService.login(userCode, password);
  }

  @Get('me')
  async checkUserToken(@Query('token') token: string) {
    return this.authService.checkUserToken(token);
  }
}
