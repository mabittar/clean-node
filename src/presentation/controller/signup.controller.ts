import { InvalidParamError, MissingParamError } from "./errors"
import { badRequest, serverError } from "./helpers/http-helper"
import { ControllerInterface } from "./protocols/controller.interface"
import { EmailValidator } from "./protocols/email-validator"
import { HttpRequestProtocol, HttpResponseProtocol } from "./protocols/http"

export class SignUpController implements ControllerInterface {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator){
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