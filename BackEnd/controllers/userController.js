const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const uservalidationSchama = require("../validation/signupvalidation");

// Salt rounds for bcrypt
const JWT_SECRET = process.env.SECRETKEY || "yourDefaultSecretKey";

// User sign-up function
const signUp = async (req, res) => {
  try {
    // Validate the request body
    const { error, value } = uservalidationSchama.validate(req.body);
    if (error) {
      return res.status(400).json({
        errors: error.details.map((err) => err.message),
      });
    }

    // Destructure validated fields
    const { first_name, last_name, email, password, mobileNo } = value;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = new User({
      first_name,
      last_name,
      email,
      password: hashPassword,
      mobileNo,
    });
    await user.save();

    res.status(201).json({ message: "User successfully registered", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User is not registered" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ user }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send token as cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({ message: "Login successful", token: token, user: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signUp, login, getUserDetails };
