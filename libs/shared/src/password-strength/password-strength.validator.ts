import { Injector } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ZXCVBNResult } from 'zxcvbn';

import { PasswordStrengthService } from './password-strength.service';

function isEmptyInputValue(value: any): boolean {
  return value == null || value.length === 0;
}

function hasNoPunctuation(value: string): boolean {
  const punc = ['.', '?', '!', ';'];
  const lastChar = value.charAt(value.length - 1);
  return punc.indexOf(lastChar) === -1;
}

export class PasswordStrengthValidator {
  static validate(injector: Injector): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // Don't validate empty values to allow for optional controls.
      }

      const passwordStrengthService = injector.get(PasswordStrengthService);

      passwordStrengthService.setTestResult(control.value);
      const testResult: ZXCVBNResult = passwordStrengthService.getTestResultDirectly();

      const suggestions: string[] = testResult.feedback.suggestions;
      suggestions.forEach((sug: string, index: number) => {
        if (sug.length && hasNoPunctuation(sug)) {
          sug += '.';
          suggestions[index] = sug;
        }
      });
      let suggestionsString = suggestions.join(' ');

      let warning = testResult.feedback.warning;
      if (warning.length && hasNoPunctuation(warning)) {
        warning += '.';
      }
      if (warning.length) {
        suggestionsString = `${suggestionsString} ${warning}`;
      }

      return testResult.score >= 3
        ? null
        : {
            passwordStrength: { suggestions: suggestionsString }
          };
    };
  }
}
