export interface IBiller extends Document {
 _id:string;
  name: string;
  category: string;
  collectionAccountId: string;
  validationPattern?: string;
  fixedAmounts: number[];
  isActive: boolean;
  contact:{
    email?: string;
    phone?: string;
  }
}



export type BillerCategory = 'ELECTRICITY' | 'WATER' | 'INTERNET' | 'MOBILE' | 'CABLE' | 'GAS';

export interface Biller {
  _id: string;
  name: string;
  category: BillerCategory;
  logo: string;
  validationPattern: string;
  placeholder: string;
}

export interface ISavedBiller {
  _id?: string;
  userId:string;
  billerId: string;
  consumerId: string;
  category: string;
  alias: string;
  lastPaidAmount: number;
  lastPaidDate: string;
  dueAmount: number;
  dueDate: string;
}


export interface Category {
  id: BillerCategory | 'ALL';
  name: string;
  icon: React.ComponentType;
  count: number;
  color: string;
}