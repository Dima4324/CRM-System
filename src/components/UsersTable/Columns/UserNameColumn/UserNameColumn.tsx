import { UserOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip, Typography } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

interface UsernameColumnProps {
    id: number;
    username: string;
}

export const UserNameColumn: FC<UsernameColumnProps> = ({ id, username }) => {
    return (
        <Flex align="center">
            <Link to={`/users/${id}`}>
                <Tooltip title="Перейти к профилю">
                    <Button 
                        icon={<UserOutlined />}
                        style={{
                            border: "none",
                            backgroundColor: "inherit",
                        }}
                    ></Button>
                </Tooltip>
            </Link>
            <Typography.Text>{username}</Typography.Text>
        </Flex>
    );
};
