import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { FC } from "react";

interface LoaderProps {
    styles: React.CSSProperties
}

export const Loader: FC<LoaderProps> = ({ styles }) => {
    return (
        <Flex align="center" justify="center" style={styles}>
            <Spin indicator={<Loading3QuartersOutlined spin />} size="large" />
        </Flex>
    );
};
