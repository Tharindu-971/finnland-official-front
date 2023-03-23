import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { CustomerStore } from '../services/customer/customer.store';


export function mobileValidate(
  customerStore: CustomerStore
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return customerStore.customers$.pipe(
      map((suppliers) => {
        const supplier = suppliers.find(
          (supplier) =>{
supplier.mobile.toLocaleLowerCase() ==
            control.value.toLocaleLowerCase()
          }
        );
        console.log('vliddation', supplier);
        return supplier ?  { mobileExist: true }: null;
       // return { mobileExist: true };
      })
    );
  };
}
