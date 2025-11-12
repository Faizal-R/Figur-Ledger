import IHashService from "../../domain/interfaces/services/IHashService";
export default class HashService implements IHashService {
    hash(password: string): Promise<string>;
    compare(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
