import { Outlet, useMatch } from "react-router-dom";
import ChatUsers from "../components/chat/ChatUsers";

const ChatLayout = () => {
  const matchIndex = useMatch({ path: "/chat", end: true });
  const matchUser = useMatch("/chat/:userId");

  const showSidebar = !matchUser || !!matchIndex;
  const showChat = !!matchUser || !matchIndex;

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-hidden bg-white">
      <div className="flex h-full w-full flex-col sm:flex-row">
        <aside
          className={[
            "h-full min-h-0 shrink-0 border-slate-200 bg-white",
            showSidebar ? "block" : "hidden",
            "w-full border-b sm:block sm:w-72 sm:border-b-0 sm:border-r",
          ].join(" ")}
        >
          <div className="h-full min-h-0 overflow-hidden">
            <ChatUsers />
          </div>
        </aside>

        <main
          className={[
            "h-full min-h-0 flex-1 flex-col overflow-hidden bg-white",
            showChat ? "flex" : "hidden",
          ].join(" ")}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ChatLayout;
