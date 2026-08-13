import { useQuery } from "@tanstack/react-query";
import { getConnectionRequests } from "../services/connections";
import NotificationRequest from "../components/NotificationRequest";
import type { ConnectionRequest  } from "../types";

const NotificationsPage = () => {
  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery<ConnectionRequest []>({
    queryKey: ["notifications"],
    queryFn: getConnectionRequests,
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Notifications</h1>

        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Notifications</h1>

        <p className="text-red-500">Something went wrong.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Notifications</h1>

      {requests.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white py-12 text-center shadow-sm">
          <p className="text-gray-500">No notifications.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((request: ConnectionRequest ) => (
            <NotificationRequest key={request._id} request={request} />
          ))}
        </div>
      )}
    </main>
  );
};

export default NotificationsPage;
