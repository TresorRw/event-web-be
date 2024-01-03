import { Issues } from "valibot";

/**
 * Returns an array of error messages from validation issues.
 *
 * @param {Issues} issues - The issues from validation
 * @returns {string[]} An array containing the error messages
 */

export function validationMessages(issues: Issues): string[] {
  return issues.map((issue) => issue.message);
}
