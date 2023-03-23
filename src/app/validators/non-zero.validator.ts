import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function nonZeroValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        if (Number(control.value) < 0) {
            return {nonZero: true};
          } else {
            return null;
          }
    }
}