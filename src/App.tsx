import "./App.scss";
import { TodosPage } from "./pages/TodosPage/TodosPage";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { AuthLayout } from "./components/Layouts/AuthLayout";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { CheckAuth } from "./components/CheckAuth/CheckAuth";
import { UsersListPage } from "./pages/UsersListPage/UsersListPage";
import { UserProfilePage } from "./pages/UserProfilePage/UserProfilePage";

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { index: true, element: <Navigate to="login" replace /> },
            { path: "login", element: <LoginPage /> },
            { path: "registration", element: <RegisterPage /> },
        ],
    },
    {
        path: "/",
        element: <CheckAuth />,
        children: [
            { index: true, element: <Navigate to="todos" replace /> },
            { path: "todos", element: <TodosPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "users", element: <UsersListPage />},
            { path: "users/:id", element: <UserProfilePage /> },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
