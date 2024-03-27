import { ITokenGenerator } from "../../../../data/protocols/jwt";
import jwt from 'jsonwebtoken';

export class Auth implements ITokenGenerator {
  constructor() {}

  generate(payload: any): string {
    return jwt.sign({ data: payload }, 'secret', { expiresIn: '1h' })
  }
}