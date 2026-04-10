import { Schema, model } from "mongoose";
import { type } from "node:os";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const User = model('user', userSchema);

export default User;

