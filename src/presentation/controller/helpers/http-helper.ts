import { ServerError } from "../errors"
import { HttpResponseProtocol } from "../protocols/http"


export const badRequest = (error: Error): HttpResponseProtocol => {
    return {
      statusCode: 400,
      body: error
    }
}
export const serverError = (error: Error): HttpResponseProtocol => {
    return {
      statusCode: 500,
      body: new ServerError()
    }
}