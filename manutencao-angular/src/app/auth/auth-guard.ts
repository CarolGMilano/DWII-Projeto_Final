import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { LoginService } from '../services';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const usuarioLogado = loginService.usuarioLogado;
  let url = state.url;

  if(usuarioLogado){
    if(route.data?.['role'] && route.data?.['role'].indexOf(usuarioLogado.tipo)===-1){
      router.navigate([''], { 
        queryParams: {
          error: `Proibido o acesso a ${url}`
        }
      });

      return false;
    }

    return true;
  }

  router.navigate([''], {
    queryParams: {
      error: `Deve fazer o login antes de acessar ${url}`
    }
  });
  
  return false;
};
