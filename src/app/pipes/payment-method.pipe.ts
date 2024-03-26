import { Pipe, PipeTransform } from '@angular/core';
import { PAYMENT_METHODS } from '../constant/paymentMethod.const';

@Pipe({
  name: 'paymentMethodConvertor',
})
export class PaymentMethodConvertorPipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    const method = PAYMENT_METHODS.find((val) => val.code === value);
    return method?.name || '';
  }
}
