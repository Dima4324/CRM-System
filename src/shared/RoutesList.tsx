import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { TodosPage } from "../pages/TodosPage/TodosPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

export const RoutesList = () => {
    return (
        <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<TodosPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
