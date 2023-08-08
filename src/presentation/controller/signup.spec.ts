import { InvalidParamError, ServerError, MissingParamError } from './errors';
import { SignUpController } from './signup.controller';
import { EmailValidatorInterface } from './protocols'

interface SutTypes {
  sut: SignUpController,
  emailValidatorStub: EmailValidatorInterface
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidatorInterface {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut =  new SignUpController(emailValidatorStub)
  return {sut, emailValidatorStub  }
} 

describe('SignUp Controller', () => {

  test('Should return 400 if no nome is provided', () => {
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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

  test('Should return 400 email is invalid', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'test',
        email: 'invalidEmail',
        password: 'superPass',
        passwordConfirmation: 'superPass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call emailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'test',
        email: 'invalidEmail',
        password: 'superPass',
        passwordConfirmation: 'superPass'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('invalidEmail')
  })

  test('Should return 500 if emailValidator throws', () => {
    class EmailValidatorStub implements EmailValidatorInterface {
      isValid (email: string): boolean {
        throw new Error()
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut =  new SignUpController(emailValidatorStub)
    const httpRequest = {
      body: {
        name: 'test',
        email: 'invalidEmail',
        password: 'superPass',
        passwordConfirmation: 'superPass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})