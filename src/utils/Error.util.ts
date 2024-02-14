import { Issues } from "valibot";
import { Response } from "express";

/**
 * Returns an array of error messages from validation issues.
 *
 * @param {Issues} issues - The issues from validation
 * @returns {string[]} An array containing the error messages
 */

export function validationMessages(issues: Issues): string[] {
  return issues.map((issue) => issue.message);
}

// Middleware for handling errors
export const errorHandler = (
  res: Response,
  statusCode: number,
  message: string,
) => {
  return res.status(statusCode).json({ statusCode, message });
};
