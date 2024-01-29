import { AuthGuard } from '@nestjs/passport';
import { AUTH_JWT_STRATEGY_NAME } from '../auth.constants';

export class JwtAuthGuard extends AuthGuard(AUTH_JWT_STRATEGY_NAME) {}
