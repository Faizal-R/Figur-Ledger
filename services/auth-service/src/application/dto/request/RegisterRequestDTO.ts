import { DateString, Roles } from "@figur-ledger/types";

export interface RegisterRequestDTO {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: Roles;
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: DateString;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
