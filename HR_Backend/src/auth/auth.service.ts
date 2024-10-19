import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/authLogin.dto';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(body: AuthLoginDto) {
    const { email, password } = body;
    const user = await this.validateUser(email);
    if (!user) {
      return new HttpException(
        'User with this email does not exists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const isMatching = await this.isMatchingPassword(password, user.password);

    if (!isMatching) {
      return new HttpException(
        'INVALID_PARAMETER',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const tokens = await this.getTokens({
      id: user.id,
      email,
      role: user.role,
    });
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      name: user.name,
      company_id: user.companyId,
      email: user.email,
      role: user.role,
      userId: user.id,
    };
  }

  async isMatchingPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatching = await bcrypt.compare(password, hashedPassword);
    return isMatching;
  }

  async getTokens(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.sign(payload, {
        expiresIn: '24h',
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      }),
      this.jwt.sign(payload, {
        expiresIn: '7d',
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hash(refreshToken, 10);
    await this.userService.update(id, {
      refreshToken: hashedRefreshToken,
    });
  }

  async hash(data: string, saltRounds: number) {
    const hashed = await bcrypt.hash(data, saltRounds);
    return hashed;
  }

  async validateUser(email: string) {
    const user = await this.userService.findByEmail(email);

    return user;
  }

  // create new route for refresh token
  // check refresh token and assign new access and refresh token
}
