import { AuthGuard } from '@nestjs/passport';
import { AUTH_LOCAL_STRATEGY_NAME } from '../auth.constants';

export class LocalAuthGuard extends AuthGuard(AUTH_LOCAL_STRATEGY_NAME) {}
