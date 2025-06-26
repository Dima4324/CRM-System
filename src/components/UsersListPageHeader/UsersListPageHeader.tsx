import { Flex, Input, Radio, RadioChangeEvent, Typography } from "antd";
import { FC, memo, useState } from "react";
import { isAdmin } from "../../utils/user";
import { SearchOutlined } from "@ant-design/icons";
import { Role } from "../../types/users";
import { useAppSelector } from "../../hooks/redux";

interface UsersListPageHeaderProps {
    roles: string[] | undefined;
    onSelectedUsers: (e: RadioChangeEvent) => void;
    onSearchUser: (value: string) => void;
    searchValue?: string;
}

const UsersListPageHeader: FC<UsersListPageHeaderProps> = memo(
    ({ roles, onSelectedUsers, onSearchUser }) => {
        const userFilters = useAppSelector((state) => state.userFilters);
        const [searchValue, setSearchValue] = useState(userFilters.search);

        return (
            <>
                <Typography.Title level={2} style={{ textAlign: "center" }}>
                    Пользователи
                </Typography.Title>
                <Flex
                    justify={`${
                        isAdmin(roles as Role[]) ? "space-between" : "flex-end"
                    }`}
                >
                    {isAdmin(roles as Role[]) && (
                        <Radio.Group
                            defaultValue={userFilters.isBlocked}
                            onChange={onSelectedUsers}
                        >
                            <Radio.Button value="">Все</Radio.Button>
                            <Radio.Button value="false">Активные</Radio.Button>
                            <Radio.Button value="true">
                                Заблокированные
                            </Radio.Button>
                        </Radio.Group>
                    )}
                    <Input
                        value={searchValue}
                        placeholder="Введите имя пользователя или email..."
                        addonAfter={<SearchOutlined />}
                        style={{
                            width: "500px",
                            float: "right",
                            marginBottom: "20px",
                        }}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            onSearchUser(e.target.value);
                        }}
                    />
                </Flex>
            </>
        );
    }
);

export default UsersListPageHeader;
