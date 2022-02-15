import { Auth } from "models/auth";

type token = string;

async function sendCodeToUserEmail(email: string): Promise<boolean> {
  try {
    await Auth.findOrCreateAuth(email);
    return true;
  } catch (error) {
    console.error({ error: error.message }, "error en sendCodeToUserEmail");
    return false;
  }
}

async function getToken({
  email,
  code,
}: {
  email: string;
  code: number;
}): Promise<token> {
  const token = await Auth.createAuthToken(email, code);
  if (token) {
    return token;
  } else return null;
}

export { sendCodeToUserEmail, getToken };
