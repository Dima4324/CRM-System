import { Button, Descriptions, DescriptionsProps, Typography } from "antd";
import { logout, RefreshTokenStorage } from "../../api/todos";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearToken } from "../../store/reducers/user/accessTokenSlice";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    const accessToken = useAppSelector((state) => state.accessToken);
    const profile = useAppSelector((state) => state.profile.profileInfo);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout(accessToken);
        dispatch(clearToken());
        const refreshTokenStorage = new RefreshTokenStorage();
        refreshTokenStorage.deleteToken();
        navigate("/auth");
    };

    const items: DescriptionsProps["items"] = [
        {
            label: "Имя пользователя",
            children: profile.username,
        },
        {
            label: "Почтовый адрес",
            children: profile.email,
        },
        {
            label: "Телефон",
            children: profile.phoneNumber || "Не указан",
        },
    ];

    return (
        <div>
            <Typography.Title level={2} style={{ textAlign: "center" }}>
                Профиль
            </Typography.Title>
            <div style={{ padding: "0 40px"}}>
                <Descriptions
                    bordered
                    items={items}
                    column={1}
                    style={{margin: "30px 0" }}
                />
                <Button onClick={handleLogout} color="danger" variant="solid"> Выйти</Button>
            </div>
        </div>
    );
};
