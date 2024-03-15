import { SchemaIssues } from "valibot";
import { Response } from "express";
import { isValidObjectId } from "mongoose";

/**
 * Returns an array of error messages from validation issues.
 *
 * @param {Issues} issues - The issues from validation
 * @returns {string[]} An array containing the error messages
 */

export function validationMessages(issues: SchemaIssues): string[] {
  return issues.map((issue) => issue.message);
}

export const errorHandler = (
  res: Response,
  statusCode: number,
  message: string,
) => {
  return res.status(statusCode).json({ statusCode, message });
};

// Check if a given id is valid as a mongodb ObjectId
export const verifyObjectId = (objectId: string, res: Response) => {
  if (!isValidObjectId(objectId)) {
    return errorHandler(res, 400, "Invalid ticket ID, provide correct an ID");
  }
};
