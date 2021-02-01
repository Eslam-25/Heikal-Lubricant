import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'currencypipe'
})
export class CurrencyPipe implements PipeTransform {

    transform(value: number, currencyCode: string = 'ج.م') {
        return value.toLocaleString('ar-EG') + ' ' + currencyCode;
    }

}