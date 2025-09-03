import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./application/context/AppProvider";
import { appRouter } from "./router";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={appRouter} />
    </AppProvider>
  );
}
export default App;
