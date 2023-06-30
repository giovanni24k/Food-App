import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { tokenLoader } from "./util/auth";

import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { action as logoutAction } from "./pages/Logout";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import MyAccountPage from "./pages/MyAccountPage";
import FoodListPage from "./pages/FoodListPage";
import FoodStoreDetail from "./pages/FoodStoreDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "myAccount", element: <MyAccountPage /> },
      {
        path: ":area",
        element: <FoodListPage />,
        children: [],
      },

      {
        path: "store/:nameStore",
        element: <FoodStoreDetail />,
      },

      // {
      //   path: ":area",
      //   element: <FoodListPage />,
      //   children: [
      //     {
      //       path: ":store",
      //       element: <FoodStoreDetail />,
      //     },
      //   ],
      // },
    ],
  },

  { path: "logout", action: logoutAction },
  {
    path: "auth",
    element: <AuthPage />,
    action: authAction,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
