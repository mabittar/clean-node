import { MissingParamError } from "./errors/missing-param-error"
import { badRequest } from "./helpers/http-helper"
import { ControllerInterface } from "./protocols/controller.interface"
import { HttpRequestProtocol, HttpResponseProtocol } from "./protocols/http"

export class SignUpController implements ControllerInterface {
  handle ( httpRequest: HttpRequestProtocol): HttpResponseProtocol{
    const requiredFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}