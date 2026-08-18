import { BASE_URL } from "../constants";

export const getUserChat = async (targetId: string) => {
  const response = await fetch(`${BASE_URL}/chat/${targetId}`, {
    credentials: "include",
  });
  const chats = await response.json();
  return chats;
};

export const getChatUsers = async () => {
  const response = await fetch(`${BASE_URL}/chat/users`, {
    credentials: "include",
  });
  return await response.json();
};

export const getChatConnectionUsers = async () => {
  const response = await fetch(`${BASE_URL}/chat/connections`, {
    credentials: "include",
  });
  return await response.json();
};
