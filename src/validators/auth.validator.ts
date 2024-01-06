import * as v from "valibot";
import { UserRole } from "../models";

export const RegisterSchema = v.object({
  email: v.string("Your email should be string", [
    v.email("Your email should be a valid email address"),
  ]),
  role: v.enum_(UserRole, "Your role should either be organizer or attendee"),
  password: v.string("Your password should be string", [
    v.minLength(8, "Your password should be at least 8 characters"),
    v.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Your password should contain at least one lowercase letter, one uppercase letter, one digit and one special character",
    ),
  ]),
  displayName: v.string("Your name should be string", [
    v.minLength(3, "Your name should be at least 3 characters"),
  ]),
});

export const LoginSchema = v.pick(RegisterSchema, ["email", "password"]);
