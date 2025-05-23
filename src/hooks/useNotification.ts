import { notification } from "antd";
import { ArgsProps } from "antd/es/notification";

interface NotificationProps {
    message: string;
    component: React.ReactElement;
    description?: string | React.ReactNode;
    placement?: ArgsProps["placement"];
    showProgress?: boolean;
    pauseOnHover?: boolean;
}

export const useInitNotification = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = ({
        message,
        component,
        description,
        placement = "bottomLeft",
        showProgress,
        pauseOnHover,
    }: NotificationProps) => {
        api.open({
            message,
            description,
            icon: component,
            placement,
            showProgress,
            pauseOnHover,
        });
    };

    return { openNotification, contextHolder };
};
