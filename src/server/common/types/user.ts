export type Provider = 'google' | 'cognito';

export class User {
  id: number;
  provider: Provider;
  providerId: string;
  refreshToken: string | null;
  username: string;
  password: string;
  name?: string;
  created_at: Date;
  updated_at: Date;
}
