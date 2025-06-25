import { Button, Descriptions, Form, Input, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useInitNotification } from "../../hooks/useNotification";
import { FrownOutlined } from "@ant-design/icons";
import { Loader } from "../../components/Loader/Loader";
import { useCallback, useEffect, useState } from "react";
import { User, UserRequest } from "../../types/admin";
import { getUserProfile, updateUserProfile } from "../../api/admin";
import axios from "axios";
import { emailRules, phoneNumberRules, usernameRules } from "../../utils/constants";

export const UserProfilePage = () => {
    const [profile, setProfile] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    const navigate = useNavigate();

    const params = useParams();

    const { contextHolder, openNotification } = useInitNotification();

    const getUser = useCallback(async () => {
        try {
            setIsLoading(true);
            const user = await getUserProfile(Number(params.id) as number);

            setProfile(user);
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
                        description: "Произошла ошибка, попробуйте позже.",
                    });
                }
            }
        } finally {
            setIsLoading(false);
        }
    }, [params.id, openNotification]);

    const onFinish = async (values: UserRequest): Promise<void> => {
        try {
            const bodyRequest: UserRequest = {
                ...(profile?.username !== values.username && {
                    username: values.username,
                }),
                ...(profile?.email !== values.email && { email: values.email }),
                phoneNumber: values.phoneNumber,
            };

            await updateUserProfile(Number(params.id) as number, bodyRequest);
            await getUser();
            setIsEditing(false);
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
                        description: "Произошла ошибка, попробуйте позже.",
                    });
                }
            }
        }
    };

    useEffect(() => {
        if (errorStatus) {
            navigate("/auth");
        }
    }, [navigate, errorStatus]);

    useEffect(() => {
        getUser();
    }, [getUser]);

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
                    {isEditing ? (
                        <>
                            <Form
                                initialValues={{
                                    ...profile,
                                    phoneNumber:
                                        profile?.phoneNumber || "Не указан",
                                }}
                                onFinish={onFinish}
                                layout="vertical"
                            >
                                <Descriptions
                                    bordered
                                    column={1}
                                    style={{ margin: "30px 0" }}
                                    labelStyle={{ width: "50%" }}
                                    contentStyle={{
                                        padding: 12,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Descriptions.Item label="Имя пользователя:">
                                        <Form.Item
                                            style={{
                                                margin: 0,
                                                padding: 0,
                                            }}
                                            name="username"
                                            rules={usernameRules}
                                        >
                                            <Input style={{ margin: 0 }} />
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Почтовый адрес:">
                                        <Form.Item
                                            style={{
                                                margin: 0,
                                                padding: 0,
                                            }}
                                            name="email"
                                            rules={emailRules}
                                        >
                                            <Input style={{ margin: 0 }} />
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Телефон:">
                                        <Form.Item
                                            style={{
                                                margin: 0,
                                                padding: 0,
                                            }}
                                            name="phoneNumber"
                                            rules={phoneNumberRules}
                                        >
                                            <Input
                                                value={
                                                    profile?.phoneNumber || ""
                                                }
                                                style={{ margin: 0 }}
                                            />
                                        </Form.Item>
                                    </Descriptions.Item>
                                </Descriptions>
                                <Form.Item
                                    style={{
                                        display: "inline-block",
                                        margin: "0 10px 10px 0",
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Сохранить
                                    </Button>
                                </Form.Item>
                                <Button
                                    danger
                                    onClick={() => setIsEditing(false)}
                                >
                                    Отменить
                                </Button>
                            </Form>
                        </>
                    ) : (
                        <>
                            <Descriptions
                                bordered
                                column={1}
                                style={{ margin: "30px 0" }}
                                labelStyle={{ width: "50%" }}
                            >
                                <Descriptions.Item label="Имя пользователя:">
                                    <Typography.Text>
                                        {profile?.username}
                                    </Typography.Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Почтовый адрес:">
                                    <Typography.Text>
                                        {profile?.email}
                                    </Typography.Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Телефон:">
                                    <Typography.Text>
                                        {profile?.phoneNumber || "Не указан"}
                                    </Typography.Text>
                                </Descriptions.Item>
                            </Descriptions>
                            <Button
                                type="primary"
                                variant="solid"
                                onClick={() => setIsEditing(true)}
                                style={{ margin: "0 10px 0 0" }}
                            >
                                Pедактировать профиль
                            </Button>
                        </>
                    )}
                    <Button
                        onClick={() => navigate("/users")}
                        type="primary"
                        variant="solid"
                    >
                        Вернуться к списку пользователей
                    </Button>
                </div>
            )}
        </div>
    );
};
