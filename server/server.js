import express from 'express';
import cors from 'cors';
import validator from 'validator';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import userModel from './models/userModel.js';
import jwt from 'jsonwebtoken';

const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('Database connected'));
  await mongoose.connect(
    `mongodb+srv://rautelapriyank5:priyank12@cluster0.feybwca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );
};

connectDB();

const PORT = 4000;
const app = express();
app.use(express.json());
app.use(cors());

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Enter a valid email' });
    }
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({id:newUser._id},'Priyanshu124');
    console.log("this is the token",token)
    res.status(201).json({ success: true, message: 'User registered successfully',token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

app.post('/register', registerUser);

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
