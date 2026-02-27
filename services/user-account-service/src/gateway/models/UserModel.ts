import { model, Schema, Types } from 'mongoose';
import { IUserDocument } from './interfaces/IUserModel';


const UserSchema = new Schema({
  _id: { 
    type: Types.ObjectId, 
    required: true 
  },
  authUserId:{
    type:String,
    required:true,
    index:true
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
    lastName: { type: String, },
    dateOfBirth: { type: Date,  }
  },
  address: {
    street: { type: String, },
    city: { type: String,  },
    state: { type: String, },
    zipCode: { type: String,  },
    country: { type: String, default: 'US' }
  }
}, { 
  timestamps: true 
});



const UserModel=model<IUserDocument>('User', UserSchema);
export default UserModel;