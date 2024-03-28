import { ITokenGenerator } from '../../../../data/protocols/jwt';
import { Auth } from './Auth';
let authAdapter: ITokenGenerator;

describe('Auth', () => {
    beforeAll(() => {
        authAdapter = new Auth();
    });
  it('should generate a valid JWT token', () => {
    const payload = { userId: '123', role: 'admin' };

    const token = authAdapter.generate(payload);

    expect(token).toBeDefined();

    expect(typeof token).toBe('string');

  });
});
