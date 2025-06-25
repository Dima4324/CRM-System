import { Table, Tag, Typography } from "antd";
import type { RadioChangeEvent, TableColumnsType, TableProps } from "antd";
import { SortOrderType, User, UserFilters } from "../../types/admin";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUsersMeta } from "../../api/admin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FrownOutlined } from "@ant-design/icons";
import { Loader } from "../../components/Loader/Loader";
import { useInitNotification } from "../../hooks/useNotification";
import { returnRoleColor } from "../../utils/user";
import { useAppSelector } from "../../hooks/redux";
import { UserNameColumn } from "../../components/UsersTable/Columns/UserNameColumn/UserNameColumn";
import ActionsColumn from "../../components/UsersTable/Columns/ActionsColumn/ActionsColumn";
import { UserInfo } from "../../types/app";
import UserRolesModal from "../../components/UserRolesModal/UserRolesModal";
import { useDebounce } from "../../hooks/useDebounce";
import UsersListPageHeader from "../../components/UsersListPageHeader/UsersListPageHeader";

export const UsersListPage = () => {
    const roles = useAppSelector((state) => state.profile.profileInfo?.roles);
    const [users, setUsers] = useState<User[] | null>(null);
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInfo>({ id: null, roles: [] });
    const [isModalRolesOpened, setIsModalRolesOpened] = useState(false);
    const [totalAmountUsers, setTotalAmountUsers] = useState(0);
    const [usersPageNumber, setUsersPageNumber] = useState(1);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);
    const [filterParameters, setFilterParameters] = useState<UserFilters>({
        search: "",
        sortBy: "",
        sortOrder: "desc",
        isBlocked: undefined,
        limit: 20,
        offset: 0,
    });

    const navigate = useNavigate();

    const { contextHolder, openNotification } = useInitNotification();

    const onChange: TableProps<User>["onChange"] = (pagination, _, sorter) => {
        let sortOrderOption: SortOrderType = "asc";
        let sortByOption: string;

        if (!Array.isArray(sorter)) {
            sortOrderOption = sorter.order === "descend" ? "desc" : "asc";
            switch (sorter.field) {
                case "username":
                    sortByOption = "username";
                    break;
                case "email":
                    sortByOption = "email";
                    break;
                default:
                    sortByOption = "id";
                    break;
            }
        }

        setUsersPageNumber(pagination.current ?? 1);
        setFilterParameters((prev) => ({
            ...prev,
            offset: (pagination.current ?? 1) - 1,
            sortOrder: sortOrderOption,
            sortBy: sortByOption,
        }));
    };

    const debouncedSearch = useDebounce((value: string) => {
        setFilterParameters((prev) => ({ ...prev, search: value }));
    }, 600);

    const onSearchUser = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            debouncedSearch(e.target.value);
        },
        [debouncedSearch]
    );

    const onSelectedUsers = useCallback(
        (e: RadioChangeEvent) => {
            setFilterParameters((prev) => ({
                ...prev,
                isBlocked: e.target.value,
                offset: 0,
            }));
        },
        [setFilterParameters]
    );

    const getUsers = useCallback(async () => {
        try {
            if (isFirstLoading) {
                setIsLoading(true);
            }
            const usersData = await getUsersMeta(filterParameters);

            setUsers(usersData.data);

            setTotalAmountUsers(usersData.meta.totalAmount);
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
            setIsFirstLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, filterParameters]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        if (errorStatus) {
            navigate("/auth");
        }
    }, [navigate, errorStatus]);

    const columns = useMemo<TableColumnsType<User>>(
        () => [
            {
                title: "Имя пользователя",
                dataIndex: "username",
                showSorterTooltip: {
                    target: "sorter-icon",
                    title: "Нажмите для сортировки по имени пользователя",
                },
                width: 250,
                sorter: true,
                render: (username, { id }) => {
                    return <UserNameColumn username={username} id={id} />;
                },
            },
            {
                title: "Email пользователя",
                dataIndex: "email",
                showSorterTooltip: {
                    target: "sorter-icon",
                    title: "Нажмите для сортировки по почте пользователя",
                },
                width: 250,
                sorter: true,
            },
            {
                title: "Дата регистрации",
                dataIndex: "date",
                render: (date: string) => {
                    const dateSliced = date
                        .substring(0, 10)
                        .split("-")
                        .reverse()
                        .join()
                        .replace(/,/g, ".");
                    const timeSliced = date.substring(11, 16);

                    return (
                        <Typography.Text>{`${dateSliced} ${timeSliced}`}</Typography.Text>
                    );
                },
            },
            {
                title: "Статус блокировки",
                dataIndex: "isBlocked",
                render: (isBlocked) => (
                    <Typography.Text>
                        {isBlocked ? "Заблокирован" : "Не заблокирован"}
                    </Typography.Text>
                ),
            },
            {
                title: "Роли",
                dataIndex: "roles",
                width: 150,
                render: (roles) =>
                    roles.map((role: string) => {
                        const color = returnRoleColor(role);
                        return (
                            <Tag
                                key={role}
                                color={color}
                                style={{ margin: "3px" }}
                            >
                                {role}
                            </Tag>
                        );
                    }),
            },
            {
                title: "Номер телефона",
                dataIndex: "phoneNumber",
                render: (phoneNumber) => {
                    return (
                        <Typography.Text>
                            {phoneNumber ? phoneNumber : "Не указан"}
                        </Typography.Text>
                    );
                },
            },
            {
                dataIndex: "action",
                render: (_, user) => {
                    return (
                        <ActionsColumn
                            user={user}
                            userInfo={userInfo}
                            setUserInfo={setUserInfo}
                            roles={roles}
                            setIsModalRolesOpened={setIsModalRolesOpened}
                            setErrorStatus={setErrorStatus}
                            openNotification={openNotification}
                            getUsers={getUsers}
                        />
                    );
                },
            },
        ],
        [
            userInfo,
            setUserInfo,
            roles,
            setIsModalRolesOpened,
            setErrorStatus,
            openNotification,
            getUsers,
        ]
    );

    return (
        <>
            {contextHolder}
            <div style={{ padding: "0 20px" }}>
                <UsersListPageHeader
                    onSearchUser={onSearchUser}
                    onSelectedUsers={onSelectedUsers}
                    roles={roles}
                />
                {isLoading ? (
                    <Loader styles={{ height: "80vh" }} />
                ) : (
                    <>
                        <Table<User>
                            pagination={{
                                current: usersPageNumber,
                                total: totalAmountUsers,
                                pageSize: filterParameters.limit,
                                showSizeChanger: false,
                            }}
                            columns={columns}
                            dataSource={users || undefined}
                            onChange={onChange}
                            scroll={{ x: "max-content" }}
                            rowKey={(record) => record.id}
                            style={{
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                            }}
                        />
                    </>
                )}
            </div>
            <UserRolesModal
                userInfo={userInfo}
                isModalRolesOpened={isModalRolesOpened}
                setUserInfo={setUserInfo}
                setIsModalRolesOpened={setIsModalRolesOpened}
                setErrorStatus={setErrorStatus}
                openNotification={openNotification}
                getUsers={getUsers}
            />
        </>
    );
};
