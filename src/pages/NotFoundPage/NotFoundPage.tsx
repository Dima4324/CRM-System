import { FrownOutlined } from "@ant-design/icons"
import { Flex, Typography } from "antd"

export const NotFoundPage = () => {
    return (
        <Flex vertical align="center" justify="center" style={{ height: "100vh" }}>
            <FrownOutlined style={{ fontSize: 50 }} />
            <Typography.Title>404 Not Found: Такой страницы не существует</Typography.Title>
        </Flex>
    )
}