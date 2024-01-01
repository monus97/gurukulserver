const secure = require("../bcrypt/bcrypt");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  try {
    const {
      userName,
      password,
      gender,
      references,
      city,
      state,
      phoneNumber,
      email,
    } = req.body;
    if (
      !userName ||
      !password ||
      !gender ||
      !references ||
      !city ||
      !state ||
      !phoneNumber ||
      !email
    ) {
      return res.status(203).json({
        message: "Please fill all fields",
      });
    }
    const checkedUser = await User.findOne({ email: req.body.email });
    if (checkedUser) {
      return res.status(409).json({ message: "email already exists" });
    }
    const newUser = new User({
      userName,
      email,
      password: await secure(password),
      gender,
      references,
      city,
      state,
      phoneNumber,
    });

    const savedUser = await newUser.save();
    savedUser.password = undefined;
    res.status(201).json({
      status: "success",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter all fields!",
      });
    }

    const checkEmail = await User.findOne({ email: req.body.email });
    if (!checkEmail) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
    const isMatch = await bcrypt.compare(password, checkEmail.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
    checkEmail.password = undefined;
    //   const token = jwt.sign({ id: checkEmail._id }, process.env.JWT_SECRET, {
    //     expiresIn: "1d",
    //   });
    res.status(200).json({
      status: "success",
      // token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allData = await User.find({});
    if (allData.length > 0) {
      res.status(200).json({
        status: "success",
        data: allData,
      });
    } else {
      res.status(404).json({
        message: "No Data Found!",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const editUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { userRegister, loginUser, getAllUsers, editUser, deleteUser };
