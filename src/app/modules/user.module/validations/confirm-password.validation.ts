import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchPassword(passwordFormControl, confirmPasswordFormControl): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get(passwordFormControl).value;
        const confirmPassword = control.get(confirmPasswordFormControl).value;

        if(password != confirmPassword){
            return {'noMatch': true, 'message': 'The password and confirm password must match.'}
        }

        return null;
    }
}