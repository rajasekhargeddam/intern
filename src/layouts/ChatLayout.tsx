import { Outlet } from "react-router-dom";
import ConnectedUsers from "../components/chat/ConnectedUsers";

const ChatLayout = () => {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <ConnectedUsers />

      {/* Chat Area */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;
