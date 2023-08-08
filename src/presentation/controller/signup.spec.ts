import { MissingParamError } from './errors/missing-param-error';
import { SignUpController } from './signup.controller';

const makeSut = (): SignUpController => {
  return new SignUpController()
} 

describe('SignUp Controller', () => {

  test('Should return 400 if no nome is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: 'test@tes.com'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'test'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'test',
        email: 'test@tes.com'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'test',
        email: 'test@tes.com',
        password: 'superPass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})