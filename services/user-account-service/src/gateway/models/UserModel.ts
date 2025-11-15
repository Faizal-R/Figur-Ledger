import { model, Schema, Types } from 'mongoose';
import { IUserDocument } from './interfaces/IUserModel';


const UserSchema = new Schema({
  _id: { 
    type: Types.ObjectId, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
  },
  phone:{
  type:Number,
  required:true
  },
  avatarKey:{
    type:String,
    default:null
  },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'US' }
  }
}, { 
  timestamps: true 
});



const UserModel=model<IUserDocument>('User', UserSchema);
export default UserModel;