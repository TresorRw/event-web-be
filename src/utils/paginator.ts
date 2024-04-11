import { Model } from "mongoose";
import { type Request } from "express";

/**
 * Util function to help in pagination
 *
 * @param {Request} req # Express request
 * @param {any} filter # Filter to apply
 * @param {Model<any>} modelName # Mongoose model
 * @returns {Promise<{perPage: number, page: number, totalResults: number}>} # Pagination options
 */

export const paginationOptions = async (
  req: Request,
  filter: any,
  modelName: Model<any>,
): Promise<{ perPage: number; page: number; totalResults: number }> => {
  const perPage = parseInt(req.query.perPage as string) || 25;
  const page = parseInt(req.query.page as string) || 1;
  const totalResults = await modelName.countDocuments(filter);
  return { perPage, page, totalResults };
};
