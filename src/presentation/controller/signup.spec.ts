import { SignUpContoller } from './signup.controller';

describe('SignUp Controller', () => {

  test('Should return 400 if no nome is provided', () => {
    const sut = new SignUpContoller()
    const httpRequest = {
      body: {
        email: 'test@tes.com'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpContoller()
    const httpRequest = {
      body: {
        name: 'test'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })
})