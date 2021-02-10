import bcrypt from "bcrypt";

export const encrypt = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const compare = async ({
  password,
  hash,
}: {
  password: string;
  hash: string;
}) => {
  return await bcrypt.compare(password, hash);
};
