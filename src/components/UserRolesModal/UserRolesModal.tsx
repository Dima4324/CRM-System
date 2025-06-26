import {
    Button,
    Flex,
    Modal,
    Popconfirm,
    Select,
    SelectProps,
    Tag,
} from "antd";
import { FC } from "react";
import { returnRoleColor } from "../../utils/user";
import { Roles } from "../../types/admin";
import { updateUserRights } from "../../api/admin";
import { NotificationProps, UserInfo } from "../../types/app";
import axios from "axios";
import { FrownOutlined } from "@ant-design/icons";

interface UserRolesModalProps {
    isModalRolesOpened: boolean;
    userInfo: UserInfo;
    setIsModalRolesOpened: (isOpened: boolean) => void;
    setUserInfo: (userInfo: UserInfo) => void;
    getUsers: () => Promise<void>;
    setErrorStatus: (status: number) => void;
    openNotification: (options: NotificationProps) => void;
}

const UserRolesModal: FC<UserRolesModalProps> = ({
    isModalRolesOpened,
    userInfo,
    setIsModalRolesOpened,
    setUserInfo,
    getUsers,
    setErrorStatus,
    openNotification,
}) => {
    const onConfirmChangeRoles = async (userInfo: UserInfo) => {
        try {
            await updateUserRights(userInfo.id as number, {
                roles: userInfo.roles,
            });
            await getUsers();
            setIsModalRolesOpened(false);
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

    const options: SelectProps["options"] = [
        {
            label: Roles.ADMIN,
            value: Roles.ADMIN,
        },
        {
            label: Roles.MODERATOR,
            value: Roles.MODERATOR,
        },
        {
            label: Roles.USER,
            value: Roles.USER,
        },
    ];

    return (
        <>
            <Modal
                title="Изменение ролей пользователя"
                open={isModalRolesOpened}
                onCancel={() => setIsModalRolesOpened(false)}
                okText="Сохранить"
                cancelText="Отменить"
                footer={
                    <Flex justify="end" gap="10px">
                        <Button color="danger" variant="outlined" onClick={() => setIsModalRolesOpened(false)}>
                            Отменить
                        </Button>
                        <Popconfirm
                            title="Подтвердите изменение прав пользователя"
                            onConfirm={() => onConfirmChangeRoles(userInfo)}
                            okText="Подтверждаю"
                            cancelText="Отменить"
                        >
                            <Button type="primary">Сохранить</Button>
                        </Popconfirm>
                    </Flex>
                }
            >
                <Select
                    mode="multiple"
                    value={userInfo.roles}
                    onChange={(rolesArray) => {
                        setUserInfo({ ...userInfo, roles: rolesArray });
                    }}
                    style={{ width: "100%" }}
                    options={options}
                    tagRender={({ label, value, closable, onClose }) => {
                        const color = returnRoleColor(value);
                        return (
                            <Tag
                                color={color}
                                style={{ margin: "3px" }}
                                closable={closable}
                                onClose={onClose}
                            >
                                {label}
                            </Tag>
                        );
                    }}
                />
            </Modal>
        </>
    );
};

export default UserRolesModal;
