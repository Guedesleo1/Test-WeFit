import { LoginDomain } from "./login-domain";

describe("Login Domain", () => {
    test("should create login domain", () => {
        const newLogin = LoginDomain.create({
            "name":"Leonardo",
            "email": "leonardo@gmail.com",
            "password": "1234567",
            "userId": "fa13da30-b732-4666-bf43-91717a184ec9",
          });
        expect(newLogin).toBeInstanceOf(LoginDomain);
        expect(newLogin).toHaveProperty("userId");
        expect(newLogin).toHaveProperty("name");
        expect(newLogin).toHaveProperty("email");
        expect(newLogin).toHaveProperty("password");
    });
    test("should create user name in upper case", () => {
        const newLogin = LoginDomain.create({
            "userId": "fa13da30-b732-4666-bf43-91717a184ec9",
            "name": "Any Name Test",
            "email": "any_mail@test.com",
            "password": "Any_passowrd_test",
        });
        expect(newLogin).toBeInstanceOf(LoginDomain);
        expect(newLogin).toHaveProperty("name");
        expect(newLogin.name).toStrictEqual("ANY NAME TEST");
    });
    test("should create user email in upper case", () => {
        const newLogin = LoginDomain.create({
            "userId": "fa13da30-b732-4666-bf43-91717a184ec9",
            "name": "Any Name Test",
            "email": "any_mail@test.com",
            "password": "Any_passowrd_test",
        });
        expect(newLogin).toBeInstanceOf(LoginDomain);
        expect(newLogin).toHaveProperty("email");
        expect(newLogin.email).toStrictEqual("ANY_MAIL@TEST.COM");
    });
});