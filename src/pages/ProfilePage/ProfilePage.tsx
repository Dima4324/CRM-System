import { Button, Descriptions, DescriptionsProps, Flex, Spin, Typography } from "antd";
import { logout, tokensStorage } from "../../api/user";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProfileInfoAction } from "../../store/actions/profileActions";
import { useInitNotification } from "../../hooks/useNotification";
import { FrownOutlined, Loading3QuartersOutlined } from "@ant-design/icons";

export const ProfilePage = () => {
    const profile = useAppSelector((state) => state.profile.profileInfo);
    const isLoading = useAppSelector((state) => state.profile.isLoading);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { contextHolder, openNotification } = useInitNotification();

    const handleLogout = async () => {
        await logout();
        tokensStorage.deleteTokens();
        navigate("/auth");
    };

    useEffect(() => {
        const setProfileInfo = async () => {
            try {
                if (!profile) {
                    await dispatch(getProfileInfoAction()).unwrap();
                }
            } catch (error) {
                openNotification({
                    message: "Ошибка",
                    component: <FrownOutlined style={{ color: "#ff0e0e" }} />,
                    description: error as string,
                    placement: "topRight",
                });
            }
        };
        setProfileInfo();
    }, [dispatch, profile, openNotification]);

    const items: DescriptionsProps["items"] = [
        {
            label: "Имя пользователя",
            children: profile && profile.username,
        },
        {
            label: "Почтовый адрес",
            children: profile && profile.email,
        },
        {
            label: "Телефон",
            children: (profile && profile.phoneNumber) || "Не указан",
        },
    ];

    return (
        <div>
            {contextHolder}
            <Typography.Title level={2} style={{ textAlign: "center" }}>
                Профиль
            </Typography.Title>
            {isLoading ? (
                <Flex
                    align="center"
                    justify="center"
                    style={{ height: "80vh" }}
                >
                    <Spin
                        indicator={<Loading3QuartersOutlined spin />}
                        size="large"
                    />
                </Flex>
            ) : (
                <div style={{ padding: "0 40px" }}>
                    <Descriptions
                        bordered
                        items={items}
                        column={1}
                        style={{ margin: "30px 0" }}
                    />
                    <Button
                        onClick={handleLogout}
                        color="danger"
                        variant="solid"
                    >
                        {" "}
                        Выйти
                    </Button>
                </div>
            )}
        </div>
    );
};
