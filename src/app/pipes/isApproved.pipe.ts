import { Pipe, PipeTransform } from '@angular/core';
import { LoanStatus } from '../model/loan.model';

@Pipe({
  name: 'loanStatusConvertor',
})
export class LoanStatusConvertorPipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    switch (value){
      case LoanStatus.Approved: return 'מאושר'
      case LoanStatus.Reject : return 'נדחה'
      default: return 'ממתין לאישור'
    } 
  }
}
