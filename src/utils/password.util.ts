import * as argon from "argon2";

export const hashPassword = async (password: string): Promise<string> => {
  const hash = await argon.hash(password);
  return hash;
};

export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const isValid = await argon.verify(hash, password);
  return isValid;
};
