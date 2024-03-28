export class AddressDomain {
    public readonly cepId: string;
    public readonly publicPlace: string;
    public readonly complement: string;
    public readonly neighborhood: string;
    public readonly city: string;
    public readonly state: string;

    private constructor({ cepId, publicPlace, complement, neighborhood, city, state}: AddressDomain) {
        this.cepId = cepId;
        this.publicPlace = publicPlace;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        Object.freeze(this);
    }

    static create(addressDTO: AddressDomain) {
        return new AddressDomain({
            cepId: addressDTO.cepId,
            publicPlace: addressDTO.publicPlace,
            complement: addressDTO.complement,
            neighborhood: addressDTO.neighborhood,
            city: addressDTO.city,
            state: addressDTO.state,
        });
    }
}