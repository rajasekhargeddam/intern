import { Outlet, useMatch } from "react-router-dom";
import ChatUsers from "../components/chat/ChatUsers";

const ChatLayout = () => {
  const matchIndex = useMatch({ path: "/chat", end: true });
  const matchUser = useMatch("/chat/:userId");

  const showSidebar = !matchUser || !!matchIndex;
  const showChat = !!matchUser || !matchIndex;

  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-hidden bg-slate-50">
      <div className="flex h-full w-full flex-col sm:flex-row">
        <aside
          className={[
            "shrink-0 border-slate-200 bg-white transition-all duration-200",
            showSidebar ? "block" : "hidden",
            "w-full border-b sm:block sm:w-72 sm:border-b-0 sm:border-r",
          ].join(" ")}
        >
          <div className="h-full overflow-y-auto">
            <ChatUsers />
          </div>
        </aside>

        <main
          className={[
            "flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white sm:bg-slate-50",
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
