import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function hasUpperCase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    return !hasUpperCase ? { missingUpperCase: true } : null;
  };
}

export function hasLowerCase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasLowerCase = /[a-z]+/.test(value);

    return !hasLowerCase ? { missingLowerCase: true } : null;
  };
}

export function hasNumeric(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasNumeric = /[0-9]+/.test(value);

    return !hasNumeric ? { missingNumeric: true } : null;
  };
}
