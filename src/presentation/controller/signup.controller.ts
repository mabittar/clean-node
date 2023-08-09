import { InvalidParamError, MissingParamError } from "./errors"
import { EmailValidatorHelper } from "./helpers/email-validator"
import { badRequest, serverError } from "./helpers/http-helper"
import { ControllerInterface, EmailValidatorInterface, HttpRequestProtocol, HttpResponseProtocol } from "./protocols"

export class SignUpController implements ControllerInterface {
  private readonly emailValidator: EmailValidatorInterface = new EmailValidatorHelper()

  constructor (emailValidator: EmailValidatorInterface){
    this.emailValidator = emailValidator
  }

  handle ( httpRequest: HttpRequestProtocol): HttpResponseProtocol{
    try {
    const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email);
    if (!isValid) {
      return badRequest(new InvalidParamError('email'));
    }
  } catch (error) {
    return serverError(error)
  }
}
}