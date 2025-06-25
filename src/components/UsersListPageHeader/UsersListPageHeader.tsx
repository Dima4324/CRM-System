import { Flex, Input, Radio, RadioChangeEvent, Typography } from "antd";
import { FC, memo } from "react";
import { isAdmin } from "../../utils/user";
import { SearchOutlined } from "@ant-design/icons";
import { Role } from "../../types/users";

interface UsersListPageHeaderProps {
    roles: string[] | undefined;
    onSelectedUsers: (e: RadioChangeEvent) => void;
    onSearchUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UsersListPageHeader: FC<UsersListPageHeaderProps> = memo(
    ({ roles, onSelectedUsers, onSearchUser }) => (
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
                    <Radio.Group defaultValue="" onChange={onSelectedUsers}>
                        <Radio.Button value="">Все</Radio.Button>
                        <Radio.Button value="false">Активные</Radio.Button>
                        <Radio.Button value="true">
                            Заблокированные
                        </Radio.Button>
                    </Radio.Group>
                )}
                <Input
                    placeholder="Введите имя пользователя или email..."
                    addonAfter={<SearchOutlined />}
                    style={{
                        width: "500px",
                        float: "right",
                        marginBottom: "20px",
                    }}
                    onChange={onSearchUser}
                />
            </Flex>
        </>
    )
);

export default UsersListPageHeader;
