import { HttpResponseProtocol } from "../protocols/http"


export const badRequest = (error: Error): HttpResponseProtocol => {
    return {
      statusCode: 400,
      body: error
    }
}