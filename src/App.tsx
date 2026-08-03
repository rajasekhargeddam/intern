import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { queryClient } from "./lib/queryClient";
import UserProvider from "./context/UserContext";
import routes from "./routes";
import { ScrollProvider } from "./context/ScrollContext";

const App = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-4">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ScrollProvider>
            <Toaster richColors position="top-right" />
            <RouterProvider router={routes} />
          </ScrollProvider>
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
