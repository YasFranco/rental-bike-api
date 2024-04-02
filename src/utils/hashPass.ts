import crypto from "node:crypto";

const hashPassword = (password:any) => {
  const hash = crypto.createHash("sha256");
  const hashedPassword = hash.update(password).digest("hex");
  return hashedPassword;
};

export { hashPassword };