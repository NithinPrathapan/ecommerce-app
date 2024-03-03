import User from "../models/user..model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, email, profilePicture, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ mesage: "user already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      email,
      profilePicture,
      fullname,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ mesage: "user created successfully" });
  } catch (error) {
    res.status(400).json({ mesage: "user creation failed", error: error });
  }
};
