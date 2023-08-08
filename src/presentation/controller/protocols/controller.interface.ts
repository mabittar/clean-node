import { HttpRequestProtocol, HttpResponseProtocol } from "./http";

export interface ControllerInterface {
    handle ( httpRequest: HttpRequestProtocol): HttpResponseProtocol
}