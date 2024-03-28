import { AddressDomain } from "./address-domain";


describe("User Entity", () => {
    test("should create user entity", () => {
        const newAddress = AddressDomain.create({
            "zipCodeId":"01001-000",
            "publicPlace": "Praça da Sé",
            "complement": "lado ímpar",
            "neighborhood": "Sé",
            "city": "São Paulo",
            "state": "SP",
          });
        expect(newAddress).toBeInstanceOf(AddressDomain);
        expect(newAddress).toHaveProperty("zipCodeId");
        expect(newAddress).toHaveProperty("publicPlace");
        expect(newAddress).toHaveProperty("complement");
        expect(newAddress).toHaveProperty("neighborhood");
        expect(newAddress).toHaveProperty("city");
        expect(newAddress).toHaveProperty("state");
    });
});