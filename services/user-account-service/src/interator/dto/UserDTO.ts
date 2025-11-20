import { DateString } from "@figur-ledger/types";

export interface UserDTO {
  id: string;
  email: string;
  phone: string;
  personalInfo: {
    firstName: string;
    lastName: string;

    dateOfBirth: Date;
  };

  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  createdAt: DateString;
  updatedAt: DateString;
}
