import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { UserService } from "../service/user.service";

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const role = userService.getRole();

  if (role !== 'particulier' && role !== 'collecteur'){
    router.navigate(['/login']);
    return false;
  }

  return true;
};
