//NOTES FOR "THIS" AT LINE 37!! ****

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
        minLength: [3, "First name must be at least 3 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
        minLength: [3, "Last name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "an email is required"],
        validate: [isEmail, "invalid email address"]
    },
    password: {
        type: String,
        required: [true, "a password is required"],
        minLength: [8, "password must be at least 8 characters long"]
    }

}, { timestamps: true });

//Middleware; happens in the middle of trying to adding a new user and saving them to the database.

//Virtual type is a temporary field within the model. 
//Value is what the user typed into the form for confirmPassword.


//THIS REFERS TO THE SPECIFIC DOCUMENT AT THE TIME, SO THIS WOULD BE THIS USERSCHEMA
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value)

UserSchema.pre('validate', function (next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords do not match')
    }
    next()
})

UserSchema.pre('save', function (next){
    //      password        runs 10 times -> $2a&10jalksjf8osd8fu0sdf89slkdfjsdoi23sd23454df
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})

module.exports = mongoose.model('User', UserSchema)
