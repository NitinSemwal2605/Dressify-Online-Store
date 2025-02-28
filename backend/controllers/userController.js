import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Route for user login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, user, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Route for user registration

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // validating email format and strong password

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password enter Strong Password" });
    }

    // Hashing password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating new user

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Saving user to database
    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, user, token });
  } 
  
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Route for admin login

const adminLogin = async (req, res) => {

  try{
    const { email, password } = req.body;

    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(email+password , process.env.JWT_SECRET);
    res.json({ success: true, token });
  }
  
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

export { loginUser, registerUser, adminLogin };
