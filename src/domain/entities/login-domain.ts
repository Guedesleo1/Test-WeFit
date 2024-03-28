export class LoginDomain {
    public readonly userId?: string;
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;

    private constructor({ userId, name, password, email }: LoginDomain) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        Object.freeze(this);
    }

    static create(userDTO: LoginDomain) {
        return new LoginDomain({
            userId: userDTO.userId,
            email: userDTO.email.toUpperCase(),
            name: userDTO.name.toUpperCase(),
            password: userDTO.password,
        });
    }
}