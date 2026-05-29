const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// SIGNUP
router.post(
  "/signup",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      // Existing user
      const existingUser =
        await User.findOne({ email });

      if (existingUser) {

        return res.status(400).json({
          error:
            "User already exists",
        });
      }

      // Hash password
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // Create user
      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,
        });

      res.status(201).json({
        message:
          "Signup successful",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Signup failed",
      });
    }
  }
);


// LOGIN
router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // Find user
      const user =
        await User.findOne({ email });

      if (!user) {

        return res.status(400).json({
          error:
            "Invalid credentials",
        });
      }

      // Compare password
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          error:
            "Invalid credentials",
        });
      }

      // Generate token
      const token =
        jwt.sign(

          {
            id: user._id,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );

      res.json({

        token,

        user: {

          id: user._id,

          name: user.name,

          email: user.email,
        },
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error:
          "Login failed",
      });
    }
  }
);

module.exports = router;