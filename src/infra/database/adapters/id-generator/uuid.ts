import { v4 as uuidv4 } from "uuid";
import { IdGenerator } from "../../../../data/protocols/id-generator";

export class Uuid implements IdGenerator {
    random() {
        return uuidv4();
    }
}