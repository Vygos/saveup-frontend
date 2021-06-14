import { JwtConfig, JwtModuleOptions } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const jwtConfig: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    allowedDomains: [environment.apiUrlSimple],
    disallowedRoutes: [
      `${environment.apiUrl}/oauth/token`,
      `${environment.apiUrl}/usuario/save`,
      `${environment.apiUrl}/usuario/existsByEmail`
    ],
  },
};