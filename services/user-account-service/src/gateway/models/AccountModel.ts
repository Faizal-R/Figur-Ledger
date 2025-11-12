import { model, Schema, Types } from "mongoose";
import { IAccountDocument } from "./interfaces/IAccountModel";

const AccountSchema = new Schema({
  userId: { 
    type:  Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true 
  },
  accountNumber: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  type: { 
    type: String, 
    enum: ['savings', 'checking', 'business'],
    required: true 
  },
  balance: { 
    type: Number, 
    default: 0, 
    min: 0 
  },
  currency: { 
    type: String, 
    default: 'USD' 
  },
  status: { 
    type: String, 
    enum: ['active', 'frozen', 'closed'], 
    default: 'active' 
  }
}, { 
  timestamps: true 
});

const AccountModel = model<IAccountDocument>('Account', AccountSchema);

export default AccountModel;