import {
  Body,
  Catch,
  Controller,
  HttpException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
@Catch(HttpException)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe) // 유효성 체크
  signUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe) // 유효성 체크
  signIn(
    @Body() authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }
}
