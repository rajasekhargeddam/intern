import {
  Content,
  Item,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-dropdown-menu";
import { useContext, useState } from "react";
import { FiBookmark, FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline, MdMoreVert } from "react-icons/md";
import { UserContext } from "../../context/UserContext";
// import type { User } from "../../types/auth";
import EditPost from "./EditPost";
import type { UserPost } from "../../types";

type MoreOptionsDropdownProps = {
  post: UserPost;
  onDeleteHandler: () => void;
};

const MoreOptionsDropdown = ({
  post,
  onDeleteHandler,
}: MoreOptionsDropdownProps) => {
  const { author } = post;
  const { user } = useContext(UserContext);
  const [editOpen, setEditOpen] = useState(false);

  const isOwner = author._id?.toString() === user?._id?.toString();

  const isAdminDeletingUserPost =
    user?.role === "admin" && author.role === "user";

  console.log("Logged in user:", user);
  console.log("Post author:", author);
  console.log("isOwner:", isOwner);
  console.log("isAdminDeletingUserPost:", isAdminDeletingUserPost);

  return (
    <>
      <Root>
        <Trigger asChild>
          <button className="cursor-pointer">
            <MdMoreVert />
          </button>
        </Trigger>

        <Portal>
          <Content
            sideOffset={8}
            align="end"
            className="w-48 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-lg"
          >
            {isOwner && (
              <Item
                asChild
                onSelect={() => {
                  setTimeout(() => setEditOpen(true), 0);
                }}
              >
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition cursor-pointer hover:bg-gray-100 focus:outline-none">
                  <FiEdit2 className="text-base" />
                  <span>Edit Post</span>
                </button>
              </Item>
            )}

            {/* <Item asChild>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 focus:outline-none">
              {isSaved ? (
                <BsBookmarkFill className="text-base" />
              ) : (
                <BsBookmark className="text-base" />
              )}
              <span>{isSaved ? "Saved" : "Save Post"}</span>
            </button>
          </Item> */}

            <Item asChild>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 focus:outline-none">
                <FiBookmark className="text-base" />
                <span>Save Post</span>
              </button>
            </Item>

            {(isOwner || isAdminDeletingUserPost) && (
              <Item asChild>
                <button
                  onClick={() => onDeleteHandler()}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition cursor-pointer hover:bg-red-50 focus:outline-none"
                >
                  <MdDeleteOutline className="text-base" />
                  <span>Delete Post</span>
                </button>
              </Item>
            )}
          </Content>
        </Portal>
      </Root>
      <EditPost post={post} open={editOpen} onOpenChange={setEditOpen} />
    </>
  );
};

export default MoreOptionsDropdown;
