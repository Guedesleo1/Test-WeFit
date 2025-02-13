export class UserDomain {
    public readonly id: string;
    public readonly name: string;
    public readonly documentType: string;
    public readonly document: string;
    public readonly telephone?: string | null;
    public readonly cellphone: string;
    public readonly zipCode: string;
    public readonly email: string;
    public readonly addressNumber: string;
    public readonly complement?: string | null;

    private constructor({ 
        id, 
        name, 
        documentType, 
        document,
        telephone,
        cellphone,
        zipCode,
        email,
        addressNumber,
        complement
    }: UserDomain) {
        this.id = id, 
        this.name = name, 
        this.documentType = documentType, 
        this.document = document,
        this.telephone = telephone,
        this.cellphone = cellphone,
        this.zipCode = zipCode,
        this.email = email,
        this.addressNumber = addressNumber,
        this.complement =complement,
        Object.freeze(this);
    }

    static create(userDTO: UserDomain) {
        return new UserDomain({
            id: userDTO.id,
            name: userDTO.name,
            documentType: userDTO.documentType,
            document: userDTO.document,
            telephone: userDTO.telephone,
            cellphone: userDTO.cellphone,
            zipCode: userDTO.zipCode,
            email: userDTO.email,
            addressNumber: userDTO.addressNumber,
            complement: userDTO.complement,
        });
    }
}