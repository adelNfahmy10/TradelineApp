import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService = inject(ToastrService)

  return next(req).pipe(catchError( (err)=>{
    if(err.error.non_field_errors[0]){
      _ToastrService.error(err.error.non_field_errors[0])
      return throwError( () => {err} )
    }
    return throwError( () => {err} )
  }))
};
