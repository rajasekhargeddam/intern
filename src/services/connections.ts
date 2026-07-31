import { BASE_URL } from "../constants";

export const getConnectionRequests = async () => {
  const response = await fetch(`${BASE_URL}/connections/requests`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch notifications.");
  }

  return data.requests;
};

export const sendConnectionRequest = async (receiverId: string) => {
  const response = await fetch(
    `${BASE_URL}/connections/request/${receiverId}`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send connection request.");
  }

  return data;
};

export const acceptConnectionRequest = async (connectionId: string) => {
  const response = await fetch(
    `${BASE_URL}/connections/${connectionId}/accept`,
    {
      method: "PATCH",
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to accept connection request.");
  }

  return data;
};

export const rejectConnectionRequest = async (connectionId: string) => {
  const response = await fetch(
    `${BASE_URL}/connections/${connectionId}/reject`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to reject connection request.");
  }

  return data;
};

export const getConnections = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/connections/${userId}`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.connections;
};
