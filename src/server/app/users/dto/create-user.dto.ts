import { Provider } from 'src/server/common/types/user';

export class CreateUserDto {
  provider: Provider;
  providerId: string;
  refreshToken: string | null;
  username: string;
  password: string;
  name: string;
}
