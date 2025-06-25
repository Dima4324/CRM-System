import { Button, Descriptions, DescriptionsProps, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../store/actions/profileActions";
import { useInitNotification } from "../../hooks/useNotification";
import { FrownOutlined } from "@ant-design/icons";
import { Loader } from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProfilePage = () => {
    const profile = useAppSelector((state) => state.profile.profileInfo);
    const isLoading = useAppSelector((state) => state.profile.isLoading);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { contextHolder, openNotification } = useInitNotification();

    const handleLogout = async () => {
        try {
            await dispatch(logoutAction()).unwrap();
            navigate("/auth");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.status === 401) {
                    setErrorStatus(error.status);
                } else {
                    openNotification({
                        message: "Ошибка",
                        component: (
                            <FrownOutlined style={{ color: "#ff0e0e" }} />
                        ),
                        description: error.message,
                        placement: "topRight",
                    });
                }
            }
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
            children: (
                <Typography.Text>
                    {profile?.phoneNumber || "Не указан"}
                </Typography.Text>
            ),
        },
    ];

    useEffect(() => {
            if (errorStatus) {
                navigate("/auth");
            }
        }, [navigate, errorStatus]);

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
