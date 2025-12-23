import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _NgxSpinnerService = inject(NgxSpinnerService)

  _NgxSpinnerService.show()
  return next(req).pipe(finalize(()=>{
    _NgxSpinnerService.hide()
  }));
};
