export class LoginDomain {
    public readonly id?: string;
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;

    private constructor({ id, name, password, email }: LoginDomain) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        Object.freeze(this);
    }

    static create(userDTO: LoginDomain) {
        return new LoginDomain({
            id: userDTO.id,
            email: userDTO.email.toUpperCase(),
            name: userDTO.name.toUpperCase(),
            password: userDTO.password,
        });
    }
}