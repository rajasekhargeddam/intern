import * as Dialog from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";

import { getConnections } from "../../services/connections";
import ConnectionItem from "./ConnectionItem";
import FailedView from "../common/FailedView";
import ConnectionsShimmer from "../../shimmer/ConnectionsShimmer";
import type { UserConnection } from "../../types";

interface ConnectionsDialogProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConnectionsDialog = ({
  userId,
  open,
  onOpenChange,
}: ConnectionsDialogProps) => {
  const {
    data: connections = [],
    isLoading,
    isError,
  } = useQuery<UserConnection[]>({
    queryKey: ["connections", userId],
    queryFn: () => getConnections(userId),
    enabled: open,
  });


  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 h-screen w-screen -translate-x-1/2 -translate-y-1/2 bg-white outline-none sm:h-[75vh] sm:max-h-175  sm:w-full sm:max-w-md sm:rounded-2xl sm:shadow-xl">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <Dialog.Title className="text-lg font-semibold">
                Connections
              </Dialog.Title>

              <Dialog.Close asChild>
                <button className="rounded-full p-2 transition hover:bg-gray-100">
                  <IoClose size={22} />
                </button>
              </Dialog.Close>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading && <ConnectionsShimmer />}

              {isError && !isLoading && <FailedView />}

              {!isLoading && !isError && connections.length === 0 && (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No connections yet.
                </div>
              )}

              {!isLoading &&
                !isError &&
                connections.map((connection) => (
                  <ConnectionItem
                    key={connection._id}
                    connection={connection}
                    onClose={() => onOpenChange(false)}
                  />
                ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConnectionsDialog;
