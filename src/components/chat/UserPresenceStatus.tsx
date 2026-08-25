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
    return <span className="text-[11px] font-medium leading-none text-green-600">Online</span>;
  }

  const lastSeenLabel = formatLastSeen(lastSeen);

  if (!lastSeenLabel) {
    return null;
  }

  return <span className="text-[11px] leading-none text-slate-500">{lastSeenLabel}</span>;
};

export default UserPresenceStatus;
