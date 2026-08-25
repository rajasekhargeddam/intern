import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Close,
} from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { CiMenuBurger } from "react-icons/ci";

type ToggleSideBarProps = {
  children: ReactNode;
};

const ToggleSideBar = ({ children }: ToggleSideBarProps) => {
  return (
    <Root>
      <Trigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden">
          <CiMenuBurger />
        </button>
      </Trigger>

      <Portal>
        <Overlay className="fixed inset-0 bg-black/50" />
        <Content className="fixed left-0 top-0 z-50 h-full w-full max-w-xs overflow-y-auto bg-white p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <Title className="text-base font-semibold">Menu</Title>
            <Close asChild>
              <button className="rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100">
                Close
              </button>
            </Close>
          </div>

          {children}
        </Content>
      </Portal>
    </Root>
  );
};

export default ToggleSideBar;
