const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

// REGISTER SERVICE
const registerUser = async ({ name, email, password }) => {
    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser({
        name,
        email,
        password: hashedPassword
    });

    return { msg: "User registered successfully" };
};

// LOGIN SERVICE
const loginUser = async ({ email, password }) => {
    const user = await userRepository.findUserByEmail(email);

    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );


    //   const { password: _, ...userData } = user._doc;

    return {
        token,

    };
};

const getMe = async (userId) => {
    const user = await userRepository.findUserById(userId);

    if (!user) throw new Error("User not found");

    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};