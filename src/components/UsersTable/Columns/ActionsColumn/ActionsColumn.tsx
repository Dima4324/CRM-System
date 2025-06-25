import { Button, Dropdown, MenuProps, Popconfirm, Typography } from "antd";
import { FC, memo, useCallback, useMemo } from "react";
import { isAdmin } from "../../../../utils/user";
import { FrownOutlined, MoreOutlined } from "@ant-design/icons";
import { User } from "../../../../types/admin";
import { Role } from "../../../../types/users";
import { blockUser, deleteUser, unlockUser } from "../../../../api/admin";
import axios from "axios";
import { NotificationProps, UserInfo } from "../../../../types/app";

interface ActionsColumnProps {
    user: User;
    roles: Role[] | undefined;
    userInfo: UserInfo;
    setIsModalRolesOpened: (isOpened: boolean) => void;
    setUserInfo: (userInfo: UserInfo) => void;
    setErrorStatus: (status: number) => void;
    openNotification: (options: NotificationProps) => void;
    getUsers: () => Promise<void>;
}

const ActionsColumn: FC<ActionsColumnProps> = memo(
    ({
        user,
        roles,
        setIsModalRolesOpened,
        setUserInfo,
        userInfo,
        getUsers,
        setErrorStatus,
        openNotification,
    }) => {
        const onConfirmDeleteUser = useCallback(
            async (id: number) => {
                try {
                    await deleteUser(id);
                    await getUsers();
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.status === 401) {
                            setErrorStatus(error.status);
                        } else {
                            openNotification({
                                message: "Ошибка",
                                component: (
                                    <FrownOutlined
                                        style={{ color: "#ff0e0e" }}
                                    />
                                ),
                                description:
                                    "Произошла ошибка, попробуйте позже.",
                            });
                        }
                    }
                }
            },
            [getUsers, setErrorStatus, openNotification]
        );

        const onConfirmBlockOrUnblockUser = useCallback(
            async (id: number, isBlocked: boolean) => {
                try {
                    if (isBlocked) {
                        await unlockUser(id);
                    } else {
                        await blockUser(id);
                    }
                    await getUsers();
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.status === 401) {
                            setErrorStatus(error.status);
                        } else {
                            openNotification({
                                message: "Ошибка",
                                component: (
                                    <FrownOutlined
                                        style={{ color: "#ff0e0e" }}
                                    />
                                ),
                                description:
                                    "Произошла ошибка, попробуйте позже.",
                            });
                        }
                    }
                }
            },
            [getUsers, setErrorStatus, openNotification]
        );

        const items = useMemo<MenuProps["items"]>(
            () => [
                {
                    key: "block",
                    label: (
                        <Popconfirm
                            title={`${
                                user.isBlocked
                                    ? "Разблокировать"
                                    : "Заблокировать"
                            } пользователя`}
                            description="Подтвердите действие"
                            onConfirm={() =>
                                onConfirmBlockOrUnblockUser(
                                    user.id,
                                    user.isBlocked
                                )
                            }
                            okText="Подтвердить"
                            cancelText="Отменить"
                        >
                            <Typography.Text
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    margin: 0,
                                    padding: 0,
                                }}
                            >
                                {`${
                                    user.isBlocked
                                        ? "Разблокировать"
                                        : "Заблокировать"
                                }`}
                            </Typography.Text>
                        </Popconfirm>
                    ),
                    onClick: async () => {},
                },
                ...(isAdmin(roles as Role[])
                    ? [
                          {
                              key: "changeRole",
                              label: "Поменять роль",
                              onClick: () => {
                                  setIsModalRolesOpened(true);
                                  setUserInfo({
                                      ...userInfo,
                                      roles: user.roles,
                                      id: user.id,
                                  });
                              },
                          },
                      ]
                    : []),
                ...(isAdmin(roles as Role[])
                    ? [
                          {
                              key: "delete",
                              label: (
                                  <Popconfirm
                                      title="Удаление пользователя"
                                      description="Подтвердите действие"
                                      onConfirm={() =>
                                          onConfirmDeleteUser(user.id)
                                      }
                                      okText="Подтвердить"
                                      cancelText="Отменить"
                                  >
                                      <Typography.Text
                                          type="danger"
                                          style={{
                                              width: "100%",
                                              display: "flex",
                                              margin: 0,
                                              padding: 0,
                                          }}
                                      >
                                          Удалить
                                      </Typography.Text>
                                  </Popconfirm>
                              ),
                          },
                      ]
                    : []),
            ],
            [
                user,
                roles,
                setIsModalRolesOpened,
                setUserInfo,
                userInfo,
                onConfirmBlockOrUnblockUser,
                onConfirmDeleteUser,
            ]
        );

        return (
            <Dropdown trigger={["click"]} menu={{ items }}>
                <Button
                    icon={<MoreOutlined style={{ fontSize: "27px" }} />}
                    style={{
                        border: "none",
                        backgroundColor: "none",
                    }}
                />
            </Dropdown>
        );
    }
);

export default ActionsColumn;
