import { HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class tokenInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next:HttpHandler){

        req = req.clone({
            setHeaders : {
                Authorization: 'Bearer token'
            }
        })
        return next.handle(req)
    }

}

const tokenInterceptor2: HttpInterceptorFn = (req, next) =>{

    const clonned = req.clone({
        setHeaders : {
            Authorization: 'Bearer token'
        }
    })
    return next(clonned);
}



export class TokenInterceptor implements HttpInterceptor{

    intercept(req: any, next: any){
        const clonned = req.clone({
            setHeaders: {
                Authorization: 'token'
            }
        })
        return next.handle(clonned)
    }
}


const tokenIntercp: HttpInterceptorFn = (req,next)=>{
    const clonned = req.clone({
        setHeaders: {
            Authorization: 'token'
        }
    })
    return next(clonned)
}