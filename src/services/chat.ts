import { BASE_URL } from "../constants";

export const getUserChat = async (targetId: string) => {
  const response = await fetch(`${BASE_URL}/chat/${targetId}`, {
    credentials: "include",
  });
  const chats = await response.json();
  return chats;
};
