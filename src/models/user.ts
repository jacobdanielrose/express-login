import { PassportLocalDocument, PassportLocalSchema, Schema, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

export interface User extends PassportLocalDocument {
    email: string;
}

const UserSchema: PassportLocalSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

UserSchema.plugin(passportLocalMongoose)

const User = model<User>('User', UserSchema)
export default User;