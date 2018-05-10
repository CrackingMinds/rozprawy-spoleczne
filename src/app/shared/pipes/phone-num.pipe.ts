import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'phoneNum'
})
export class PhoneNumPipe implements PipeTransform {

    transform(value: any, stationary: boolean): string {
        let resultString = value.split("");
        if (stationary) {
            resultString.splice(resultString.length - 2, 0, ' ');
            resultString.splice(5, 0, ' ');
            resultString.splice(2, 0, ' ');
        }
        else {
            resultString.splice(resultString.length - 3, 0, ' ');
            resultString.splice(3, 0, ' ');
        }
        return resultString.join('');
    }

}
