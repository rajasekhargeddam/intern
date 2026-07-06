import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Close,
} from "@radix-ui/react-dialog";
import SideBar from "./SideBar";

interface Props {
  onLogout: () => void;
}

const ToggleSideBar = ({ onLogout }: Props) => {
  return (
    <Root>
      <Trigger asChild>
        <button className="flex md:hidden gap-1 border rounded-md py-1 px-4 hover:shadow-xl transition-all duration-300 cursor-pointer">
          Menu
        </button>
      </Trigger>

      <Portal>
        <Overlay className="fixed inset-0 bg-black/50" />
        <Content className="fixed right-0 top-0 z-50 h-full w-full max-w-xs bg-white p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <Title className="text-lg font-semibold">Menu</Title>
            <Close asChild>
              <button className="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg shadow-sm hover:bg-slate-200 transition-all duration-200">
                X
              </button>
            </Close>
          </div>

          <SideBar />

          <button
            type="button"
            className="mt-6 w-full border rounded-md py-2 px-4 hover:shadow-xl transition-all duration-300 cursor-pointer text-slate-800"
            onClick={onLogout}
          >
            Logout
          </button>
        </Content>
      </Portal>
    </Root>
  );
};

export default ToggleSideBar;
