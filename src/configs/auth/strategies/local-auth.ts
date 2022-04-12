import bcrypt from 'bcrypt'
import User from '../../../models/user'
import { Strategy as LocalStrategy } from 'passport-local';


export const localAuth = new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    User.findOne({ email: email})
    .then( user => {
        if(!user) {
            const newUser = new User({ email, password});
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => {
                        return done(null, user);
                    })
                    .catch(err => {
                        return done(null, false, {message: err});
                    });
                })
            })
        } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Incorrect Username or Password"})
                }
            })
        }
    })
    .catch(err => {
        return done(null, false, { message: err});
    })
})