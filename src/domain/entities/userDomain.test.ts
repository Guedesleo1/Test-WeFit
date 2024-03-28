import { UserDomain } from "./user-domain";

describe("User Entity", () => {
    test("should create user entity", () => {
        const newUser = UserDomain.create({
            "name":"Leonardo",
            "email": "leonardo@gmail.com",
            "id": "fa13da30-b732-4666-bf43-91717a184ec9",
            "documentType": 'Pessoa Fisica',
            "document": "97824952045",
            "telephone": "58742985",
            "cellphone": "985549636",
            "zipCode": "02871000",
            "addressNumber": "179",
            "complement": "1B"
          });
        expect(newUser).toBeInstanceOf(UserDomain);
        expect(newUser).toHaveProperty("id");
        expect(newUser).toHaveProperty("name");
        expect(newUser).toHaveProperty("email");
        expect(newUser).toHaveProperty("documentType");
        expect(newUser).toHaveProperty("document");
        expect(newUser).toHaveProperty("telephone");
        expect(newUser).toHaveProperty("cellphone");
        expect(newUser).toHaveProperty("zipCode");
        expect(newUser).toHaveProperty("addressNumber");
        expect(newUser).toHaveProperty("complement");
    });
});