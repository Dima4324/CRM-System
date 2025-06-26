import { Table, Tag, Typography } from "antd";
import type { RadioChangeEvent, TableColumnsType, TableProps } from "antd";
import { SortOrderType, User } from "../../types/admin";
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
import { useDispatch } from "react-redux";
import {
    setIsBlocked,
    setOffset,
    setSearch,
    setSortBy,
    setSortOrder,
} from "../../store/reducers/admin/UserFiltersSlice";

export const UsersListPage = () => {
    const roles = useAppSelector((state) => state.profile.profileInfo?.roles);
    const userFilters = useAppSelector((state) => state.userFilters);
    const [users, setUsers] = useState<User[] | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo>({ id: null, roles: [] });
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalRolesOpened, setIsModalRolesOpened] = useState(false);
    const [totalAmountUsers, setTotalAmountUsers] = useState(0);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { contextHolder, openNotification } = useInitNotification();

    const onChange: TableProps<User>["onChange"] = (pagination, _, sorter) => {
        let sortOrderOption: SortOrderType = "asc";
        let sortByOption: string = "id";

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
        dispatch(setOffset((pagination.current ?? 1) - 1));
        dispatch(setSortOrder(sortOrderOption));
        dispatch(setSortBy(sortByOption));
    };

    const debouncedSearch = useDebounce((value: string) => {
        dispatch(setSearch(value));
    }, 600);

    const onSearchUser = useCallback(
        (value: string) => {
            debouncedSearch(value);
        },
        [debouncedSearch]
    );

    const onSelectedUsers = useCallback(
        (e: RadioChangeEvent) => {
            dispatch(setIsBlocked(e.target.value));
            dispatch(setOffset(0));
        },
        [dispatch]
    );

    const getUsers = useCallback(async () => {
        try {
            if (isFirstLoading) {
                setIsLoading(true);
            }

            const usersData = await getUsersMeta(userFilters);

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
    }, [navigate, userFilters]);

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
                defaultSortOrder:
                    userFilters.sortOrder === "asc" &&
                    userFilters.sortBy === "username"
                        ? "ascend"
                        : userFilters.sortOrder === "desc" &&
                          userFilters.sortBy === "username"
                        ? "descend"
                        : undefined,
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
                defaultSortOrder:
                    userFilters.sortOrder === "asc" &&
                    userFilters.sortBy === "email"
                        ? "ascend"
                        : userFilters.sortOrder === "desc" &&
                          userFilters.sortBy === "email"
                        ? "descend"
                        : undefined,
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
            userFilters.sortBy,
            userFilters.sortOrder,
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
                                current: (userFilters.offset ?? 0) + 1,
                                total: totalAmountUsers,
                                pageSize: userFilters.limit,
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
