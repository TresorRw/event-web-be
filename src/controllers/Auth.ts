import { Request, Response } from "express";
import {
  generateToken,
  hashPassword,
  validationMessages,
  verifyPassword,
} from "../utils";
import { User } from "../models";
import { LoginSchema, RegisterSchema } from "../validators";
import { safeParse } from "valibot";

export const RegisterUser = async (req: Request, res: Response) => {
  const body = req.body;
  const result = safeParse(RegisterSchema, body);
  // If validation failed, send back the error messages
  if (result.issues) {
    return res
      .status(400)
      .json({ statusCode: 400, message: validationMessages(result.issues) });
  }

  if (result.success) {
    const { email, password, displayName } = result.output;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        statusCode: 409,
        message: "Email is already taken",
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);
    try {
      await User.create({ email, password: hashedPassword, displayName });
      res.status(201).json({
        statusCode: 201,
        message: "You have been successfully registered",
      });
    } catch (error: any) {
      res.status(500).json({
        statusCode: 500,
        message: `Something went wrong! ${error.message}`,
      });
    }
  }
};

export const LogUser = async (req: Request, res: Response) => {
  const body = req.body;
  const result = safeParse(LoginSchema, body);
  if (!result.success) {
    return res
      .status(400)
      .json({ statusCode: 400, message: validationMessages(result.issues) });
  }

  const { email, password } = result.output;
  try {
    // Find if user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "We can not recognize your email" });
    }

    // check if passwords match
    const passwordMatch = await verifyPassword(password, user.password);

    if (passwordMatch) {
      const token = generateToken({
        _id: user.id,
        email,
        displayName: user.displayName,
      });
      res.status(200).json({
        statusCode: 200,
        message: "You have been successfully logged in",
        token,
      });
    } else {
      res.status(406).json({
        statusCode: 406,
        message: "Wrong password, Try again",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      message: `Something went wrong! ${error.message}`,
    });
  }
};

export const AllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.status(200).json({ statusCode: 200, users });
};
