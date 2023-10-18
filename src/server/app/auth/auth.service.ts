import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";
import * as argon2 from 'argon2';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { BadRequestException } from "@nestjs/common";
import { SignInDto } from "./dto/signin.dto";

export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
      ) {}
      
      async signUp(dto: CreateUserDto): Promise<any> {
        // Check if user exists
        const userExists = await this.usersService.findOne(
          {where: {username: dto.username}}
        );
        if (userExists) {
          throw new BadRequestException('User already exists');
        }
    
        // Hash password
        const hash = await this.hashData(dto.password);
        const newUser = await this.usersService.create({
          ...dto,
          password: hash,
        });
        const tokens = await this.getTokens(newUser.id.toString(), newUser.username);
        await this.updateRefreshToken(newUser.id.toString(), tokens.refreshToken);
        return tokens;
      }
    
        async signIn(dto: SignInDto) {
        // Check if user exists
        const user = await this.usersService.findOne({where: {username: dto.username}});
        if (!user) throw new BadRequestException('User does not exist');
        const passwordMatches = await argon2.verify(user.password, dto.password);
        if (!passwordMatches)
          throw new BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user.id.toString(), user.username);
        await this.updateRefreshToken(user.id.toString(), tokens.refreshToken);
        return tokens;
      }
    
      async logout(userId: string) {
        return this.usersService.update(userId, { refreshToken: null });
      }
    
      hashData(data: string) {
        return argon2.hash(data);
      }

      handleGoogleRedirect(id: string, username: string) {
        const accessToken = this.jwtService.sign({username: username, sub: id})
        return accessToken
      }
    
      async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
          refreshToken: hashedRefreshToken,
        });
      }
    
      async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            {
              sub: userId,
              username,
            },
            {
              secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
              expiresIn: '15m',
            },
          ),
          this.jwtService.signAsync(
            {
              sub: userId,
              username,
            },
            {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '7d',
            },
          ),
        ]);
    
        return {
          accessToken,
          refreshToken,
        };
      }
}