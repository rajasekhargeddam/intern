import { formatLastSeen } from "../../utils/formatLastSeen";

type UserPresenceStatusProps = {
  isOnline?: boolean;
  lastSeen?: string | Date | null;
};

const UserPresenceStatus = ({
  isOnline,
  lastSeen,
}: UserPresenceStatusProps) => {
  if (isOnline) {
    return <span className="text-xs font-medium text-green-600">Online</span>;
  }

  const lastSeenLabel = formatLastSeen(lastSeen);

  if (!lastSeenLabel) {
    return null;
  }

  return <span className="text-xs text-slate-500">{lastSeenLabel}</span>;
};

export default UserPresenceStatus;
