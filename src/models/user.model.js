import mongoose, { model } from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 12,
        minlength: 3,
        required: true,
    },
    lastName: {
        type: String,
        maxlength: 12,
        minlength: 3,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (mail) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
            },
            message: `email not Vaild.`
        }

    },
    password: {
        type: String,
        // maxlength: 12,
        minlength: 3,
        // select : false  for security .
        required: function(){
            return !this.googleId ;
        },

    },
    // rePassword: {
    //     type: String,
    //     required: true,
    //     validate: {
    //         validator: function (rePass) {
    //             return rePass === this.password;
    //         },
    //         message: "Passwords do not match",
    //     }
    // },
    phone: {
        type: Number,
        required: function(){
            return !this.googleId ;
        },

    },

    googleId: { 


        type: String,
        unique: true,
        sparse: true,  // sparse: true ==> unique يتطبق بس لما googleId موجود
    },
},

    { timestamps: true }

);

const userModel = model('User', userSchema, 'Users');
export default userModel;