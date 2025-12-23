import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('tradelineToken');

  // لو فيه X-Skip-Auth ما تضيفش Bearer userToken
  if (req.headers.has('X-Skip-Auth')) {
    const cleanReq = req.clone({
      headers: req.headers.delete('X-Skip-Auth')
    });
    return next(cleanReq);
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
