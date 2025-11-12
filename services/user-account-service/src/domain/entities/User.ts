export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface ContactInfo {
  email: string;
  phone: string;
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
    public personalInfo: PersonalInfo,
    public contact: ContactInfo,
    public address: AddressInfo,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
