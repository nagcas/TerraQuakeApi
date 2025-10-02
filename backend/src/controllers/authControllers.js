import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

/**
 * Controller: Register a new user.
 */
export const signUp = ({
  User,
  buildResponse,
  handleHttpError,
  matchedData,
  sendEmailRegister,
}) => {
  return async (req, res) => {
    try {
      const data = matchedData(req);

      // Check if user already exists
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser)
        return handleHttpError(
          res,
          "User with this email already exists!",
          409
        );

      // Create new user
      const newUser = new User(data);
      const savedUser = await newUser.save();
      const user = savedUser.toObject();
      delete user.password;

      // await sendEmailRegister(user)

      return res
        .status(201)
        .json(buildResponse(req, "Registration successful", user, null, {}));
    } catch (error) {
      console.error("Signup error:", error);

      if (error.code === 11000) {
        return handleHttpError(
          res,
          "User with this email already exists!",
          409
        );
      }
      return handleHttpError(res, "Internal server error", 500);
    }
  };
};

/**
 * Controller: Authenticate user (login).
 */
export const signIn = ({
  User,
  buildResponse,
  handleHttpError,
  tokenSign,
  matchedData,
  compare,
}) => {
  return async (req, res) => {
    try {
      req.body = matchedData(req);

      const user = await User.findOne({ email: req.body.email })
        .select("password name email role")
        .lean();

      if (!user)
        return handleHttpError(
          res,
          "User not found. Please register first.",
          404
        );

      const isPasswordValid = await compare(req.body.password, user.password);
      if (!isPasswordValid)
        return handleHttpError(res, "Incorrect password.", 401);

      delete user.password;

      return res.status(200).json(
        buildResponse(req, "Logged in successfully!", user, null, {
          token: await tokenSign(user),
        })
      );
    } catch (error) {
      console.error(error.message);
      handleHttpError(res, "An internal server error occurred.", 500);
    }
  };
};

/**
 * Controller: Forgot password (send reset link).
 */
export const forgotPassword = ({
  User,
  buildResponse,
  matchedData,
  handleHttpError,
  sendForgotPassword,
}) => {
  return async (req, res) => {
    try {
      req.body = matchedData(req);

      const user = await User.findOne({ email: req.body.email })
        .select("email")
        .lean();
      if (!user) return handleHttpError(res, "User not found.", 404);

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      // await sendForgotPassword(user, token)

      return res
        .status(200)
        .json(
          buildResponse(
            req,
            "Password reset instructions sent to your email.",
            user,
            null,
            {}
          )
        );
    } catch (error) {
      console.error(error.message);
      handleHttpError(res, "Error processing request.", 400);
    }
  };
};

/**
 * Controller: Reset password.
 */
export const resetPassword = ({ User, handleHttpError, buildResponse }) => {
  return async (req, res) => {
    try {
      const { token } = req.params;
      const { password1, password2 } = req.body;

      if (password1 !== password2)
        return handleHttpError(res, "Passwords must match", 400);

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return err.name === "TokenExpiredError"
          ? handleHttpError(
              res,
              "Reset link expired. Please request a new one.",
              401
            )
          : handleHttpError(res, "Invalid or missing token", 400);
      }

      const user = await User.findById(decoded.id).select("+password");
      if (!user) return handleHttpError(res, "User not found", 404);

      const isSame = await bcrypt.compare(password1, user.password);
      if (isSame)
        return handleHttpError(
          res,
          "New password cannot be the same as the old one!",
          409
        );

      user.password = password1;
      await user.save();

      const userResponse = user.toObject();
      delete userResponse.password;

      return res
        .status(200)
        .json(
          buildResponse(
            req,
            "Password successfully reset!",
            userResponse,
            null,
            {}
          )
        );
    } catch (error) {
      console.error(error.message);
      handleHttpError(res, "Error resetting password", 500);
    }
  };
};

/**
 * Controller: Change password (logged-in user).
 */
export const changePassword = ({ User, handleHttpError, buildResponse }) => {
  return async (req, res) => {
    try {
      const { passwordOld, passwordNew, confirmPassword } = req.body;

      if (!passwordOld || !passwordNew || !confirmPassword)
        return handleHttpError(res, "All password fields are required", 400);

      if (passwordNew !== confirmPassword)
        return handleHttpError(res, "Passwords must match", 400);

      const userId = req.user._id || req.user.id;
      const user = await User.findById(userId).select("+password");
      if (!user) return handleHttpError(res, "User not found", 404);

      const isMatch = await bcrypt.compare(passwordOld, user.password);
      if (!isMatch)
        return handleHttpError(res, "Current password is incorrect", 400);

      const isSame = await bcrypt.compare(passwordNew, user.password);
      if (isSame)
        return handleHttpError(
          res,
          "New password cannot be the same as the old one!",
          409
        );

      user.password = passwordNew;
      await user.save();

      const userResponse = user.toObject();
      delete userResponse.password;

      return res
        .status(200)
        .json(
          buildResponse(
            req,
            "Password successfully changed!",
            userResponse,
            null,
            {}
          )
        );
    } catch (error) {
      console.error(error);
      handleHttpError(
        res,
        "Error changing password, please try again later",
        500
      );
    }
  };
};
