import { Body, Controller, Put } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    const { oldToken } = data;
    return this.tokenService.refreshToken(oldToken);
  }
}
