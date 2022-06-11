import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
const  TOKEN_HEADER='Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(
    private loginService:LoginService,

  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //add the jwt token
    const token=this.loginService.getToken();

    let authReq=req;
    if(token!=null){

      authReq=authReq.clone({
        setHeaders:{Authorization: `Bearer ${token}`},
      })
    }
    return next.handle(authReq);

  }

}

export const authInterceptorProviders=[
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true,

  }
]
