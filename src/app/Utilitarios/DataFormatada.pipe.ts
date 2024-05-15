import { DatePipe } from '@angular/common';
import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormatada',
  standalone: true,
})
export class DataFormatadaPipePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      const datePipe = new DatePipe('en-US');
      const dataFormatada = datePipe.transform(value, 'dd/MM/yyyy');
      return dataFormatada || ''; // Retorna uma string vazia se a data formatada for nula
    }

    return ''; // Retorna uma string vazia se a data de entrada for nula
  }

}
