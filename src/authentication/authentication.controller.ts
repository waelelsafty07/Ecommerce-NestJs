import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { RegisterDataDto } from './dto/register-data.dto';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { LocalAuthenticationGuard } from './passport/localAuthentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  /*
   * @desc   Post Register new account
   * @route  POST /api/v1/authentication/register
   * @access Public
   */
  @Post('register')
  async register(@Body() registrationData: RegisterDataDto) {
    return this.authenticationService.register(registrationData);
  }

  /*
   * @desc   Post Login with My Account
   * @route  POST /api/v1/authentication/log-in
   * @access Public
   */
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return user;
  }
  /*
   * @desc   Post Logout from My Account
   * @route  POST /api/v1/authentication/log-out
   * @access Public
   */
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }
  /*
   * @desc   Get Me from when iam authenticated
   * @route  GET /api/v1/authentication
   * @access Public
   */
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
