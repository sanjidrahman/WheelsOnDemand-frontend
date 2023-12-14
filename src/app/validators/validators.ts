import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class WhiteSpace {
    static validate(control: AbstractControl): { [key: string]: any } {
        if (control.value && control.value.trim().length === 0) {
            return { 'whitespace': true };
        }
        return {};
    }
}

export function passwordMatchValidator(password: string, confirmPass: string) {
    return (formgroup: FormGroup) => {
        const passwordcontrol = formgroup.controls[password];
        const confirmPassControl = formgroup.controls[confirmPass];

        if (confirmPassControl.errors && confirmPassControl.errors['passwordMismatch']) {
            return
        }

        if (passwordcontrol.value !== confirmPassControl.value) {
            confirmPassControl.setErrors({ passwordMismatch: true })
        }
    };
}