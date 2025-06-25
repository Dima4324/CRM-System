import {
    Button,
    Descriptions,
    DescriptionsProps,
    Typography,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../store/actions/profileActions";
import { useInitNotification } from "../../hooks/useNotification";
import { FrownOutlined } from "@ant-design/icons";
import { Loader } from "../../components/Loader/Loader";

export const ProfilePage = () => {
    const profile = useAppSelector((state) => state.profile.profileInfo);
    const isLoading = useAppSelector((state) => state.profile.isLoading);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { contextHolder, openNotification } = useInitNotification();

    const handleLogout = async () => {
        try {
            await dispatch(logoutAction()).unwrap();
            navigate("/auth");
        } catch (error) {
            openNotification({
                message: "Ошибка",
                component: <FrownOutlined style={{ color: "#ff0e0e" }} />,
                description: error as string,
                placement: "topRight",
            });
        }
    };

    const items: DescriptionsProps["items"] = [
        {
            label: "Имя пользователя:",
            children: <Typography.Text>{profile?.username}</Typography.Text>,
        },
        {
            label: "Почтовый адрес:",
            children: <Typography.Text>{profile?.email}</Typography.Text>,
        },
        {
            label: "Телефон:",
            children: <Typography.Text>{(profile?.phoneNumber) || "Не указан"}</Typography.Text>,
        },
    ];

    return (
        <div>
            {contextHolder}
            <Typography.Title level={2} style={{ textAlign: "center" }}>
                Профиль
            </Typography.Title>
            {isLoading ? (
                <Loader styles={{ height: "80vh" }} />
            ) : (
                <div style={{ padding: "0 40px" }}>
                    <Descriptions
                        bordered
                        items={items}
                        column={1}
                        style={{ margin: "30px 0" }}
                        labelStyle={{ width: "50%" }}
                    />
                    <Button
                        onClick={handleLogout}
                        color="danger"
                        variant="solid"
                    >
                        Выйти
                    </Button>
                </div>
            )}
        </div>
    );
};
