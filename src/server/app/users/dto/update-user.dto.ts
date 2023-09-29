import { Provider } from 'src/server/common/types/user';

export class UpdateUserDto {
  id: number;
  provider: Provider;
  providerId: string;
  username: string;
  name: string;
}
