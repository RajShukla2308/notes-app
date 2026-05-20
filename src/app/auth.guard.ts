import { CanActivateFn } from "@angular/router";



export const authGuard : CanActivateFn = () =>{


    let allowNavigation = true;
    if(allowNavigation) return true;
    return false;

}