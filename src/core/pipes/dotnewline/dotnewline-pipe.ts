import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dotnewline'
})
export class DotnewlinePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/\./g, '.<div class="my-2"></div>');
  }
}
