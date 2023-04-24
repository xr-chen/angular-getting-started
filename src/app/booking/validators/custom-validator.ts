import { AbstractControl, FormGroup } from "@angular/forms";

export class CustomValidator {
    static ValidateName(control: AbstractControl) {
        const value = control.value as string;
        if (value.includes('test')) {
            return { invalidName: true };
        }
        return null;
    }

    static ValidateSpecialChar(char: string) {
        return (control: AbstractControl) => {
            const value = control.value as string;
            if (value.includes(char)) {
                return { invalidSpecialChar: char };
            }
            return null;
        }
    }

    static ValidateDate(control: FormGroup) {
        const checkinDate: any = new Date(control.get('checkinDate')?.value);
        const checkoutDate: any = new Date(control.get('checkoutDate')?.value);
        const diffTime = checkoutDate - checkinDate;
        const diffDays = Math.ceil(diffTime / (24 * 60 * 60 * 1000));
        if (diffDays <= 0) {
            let error = { invalidDate: true };
            control.get('checkoutDate')?.setErrors(error);
            return error;
        }
        return null;
    }
}
