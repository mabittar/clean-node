import { EmailValidatorInterface } from "../protocols";

export class EmailValidatorHelper implements EmailValidatorInterface {
  isValid(email: string): boolean {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return expression.test(email);
  }
  
}