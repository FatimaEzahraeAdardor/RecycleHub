import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { UserService } from "../service/user.service";

export const particularGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const role = userService.getRole();

  if (role !== 'particulier') {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
