import { DateString } from "@figur-ledger/types";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface AddressInfo {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly avatarKey: string|null,
    public personalInfo: PersonalInfo,
    public address: AddressInfo,
    public readonly authUserId:string,
    public readonly createdAt?: DateString,
    public readonly updatedAt?: DateString
  ) {}
}
