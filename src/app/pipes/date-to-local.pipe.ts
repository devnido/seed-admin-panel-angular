import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateToLocal'
})
export class DateToLocalPipe implements PipeTransform {

    transform(date: Date): unknown {


        let dateTransformed = 'Nunca';


        if (typeof date !== 'undefined') {
            const dateParsed = new Date(date);
            dateTransformed = dateParsed.toLocaleDateString('es-CL', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            });


        }




        return dateTransformed;
    }

}
