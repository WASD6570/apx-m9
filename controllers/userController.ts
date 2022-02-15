import { User, userData } from "models/user";

async function getUserData(userId: string): Promise<userData> {
  return await User.getUserData(userId);
}

async function updateUserData(
  userId: string,
  data: userData
): Promise<userData> {
  return await User.updateUser(userId, data);
}

export { getUserData, updateUserData };
