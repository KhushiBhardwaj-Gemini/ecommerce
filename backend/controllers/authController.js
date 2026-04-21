const authService = require("../services/authService");

// REGISTER
const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};


const getMe = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  register,
  login,
  getMe
};




























































































// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// //register logic
// // exports.register = async (req, res) => {
// const register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ msg: "User already exists" });

//         const hashedPassword = await bcrypt.hash(password, 10);

//         user = new User({ name, email, password: hashedPassword });
//         await user.save();

//         res.json({ msg: "User registered successfully" });

//     } catch (err) {
//         res.status(500).json({ msg: err.message });
//     }
// };

// //login logic
// // exports.login = async (req, res) => {
// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         );

//         const { password: hashedPassword, ...userData } = user._doc;

//         res.json({
//             token,
//             // user: userData
//         });

//     } catch (err) {
//         res.status(500).json({ msg: err.message });
//     }
// };

// module.exports = {
//   register,
//   login
// };