import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { queryClient } from "./lib/queryClient";
import UserProvider from "./context/UserContext";
import routes from "./routes";
import { ScrollProvider } from "./context/ScrollContext";
import { Suspense } from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <ScrollProvider>
              <Toaster richColors position="top-right" />
              <RouterProvider router={routes} />
            </ScrollProvider>
          </UserProvider>
        </QueryClientProvider>
      </Suspense>
    </div>
  );
};

export default App;
