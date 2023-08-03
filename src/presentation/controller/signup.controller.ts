import { MissingParamError } from "./errors/missing-param-error"
import { badRequest } from "./helpers/http-helper"

export class SignUpController {
  handle ( httpRequest: any): any{
    const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}