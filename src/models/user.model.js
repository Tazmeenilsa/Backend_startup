import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true //for enabling searching 
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url,
            required: true
        },
        coverImage: {
            type: String,

        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video'

            }
        ],
        password: {
            type: String,
            required: [true, 'Password is requried'],
        },
        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
)

// dont use arrow function i pre method it triggered some problems because it didn't get this
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next()
    //bycrypt helps you to hash your password
    console.log('pass', this.password)
    this.password = bcrypt.hash(this.password, 10)
    console.log('password', this.password)

    next()
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) //its return true and false
}
userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })
}
userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        })
}
export const User = mongoose.model("User", userSchema)
