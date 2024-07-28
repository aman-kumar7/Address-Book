import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthService } from "./auth.service"

export const canActivateGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(authService.getUser()){
        return true;
    } else {
        router.navigate(['./home']);
        return false;
    }
}