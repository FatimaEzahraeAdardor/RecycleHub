import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { UserService } from "../service/user.service";

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const role = userService.getRole();

  if (userService.isLoggedIn()) {
    if (role == 'particulier') {
      router.navigate(['/dashboard']);
    }else {
      router.navigate(['/dashboardCollector']);
    }
    return false;
  }
  return true;
};
