import { IUser } from "@/types/user-account";

 export const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };


export const formatAddress = (address: IUser["address"]) => {
  if (!address) return "";

  const { street, city, state, zipCode, country } = address;

  // Remove empty fields to avoid messy output
  const parts = [street, city, state, zipCode, country].filter(Boolean);

  return parts.join(", ");
};


export const formatFullName = (personalInfo: IUser["personalInfo"]) => {
  if (!personalInfo) return "";

  const { firstName, lastName } = personalInfo;

  return [firstName, lastName].filter(Boolean).join(" ");
};



 export  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };
