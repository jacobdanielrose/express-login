import { Document, Schema, model } from 'mongoose';

const ThirdPartyProviderSchema = new Schema({
  provider_name: {
    type: String,
    default: null
  },
  provider_id: {
    type: String,
    default: null
  },
  provider_data: {
    type: {},
    default: null
  }

})

export interface IUser extends Document {
    email: string;
    password: string;
}

export const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    thirdpartyauth: [ThirdPartyProviderSchema]
  },
  {strict: false});

const User = model<IUser>('User', UserSchema)
export default User;