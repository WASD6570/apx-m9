import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

function createToken(id: string): string {
  return jwt.sign({ id }, secret);
}

function decodeToken(token: string): { id: string } {
  try {
    const data = jwt.verify(token, secret);
    return data as { id: string };
  } catch (error) {
    console.error({ error: error.message }, "error en jwt");
    return null;
  }
}

export { createToken, decodeToken };
