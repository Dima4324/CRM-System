import { FrownOutlined } from "@ant-design/icons"
import { Flex, Typography } from "antd"

export const NotFoundPage = () => {
    return (
        <Flex vertical align="center" justify="center" style={{ height: "100vh" }}>
            <FrownOutlined style={{ fontSize: 50 }} />
            <Typography.Title style={{ textAlign: "center" }}>Такой страницы не существует или у вас недостаточно прав</Typography.Title>
        </Flex>
    )
}