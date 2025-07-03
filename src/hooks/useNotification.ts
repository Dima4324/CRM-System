import { notification } from "antd";
import { NotificationProps } from "../types/app";
import { useCallback } from "react";

export const useInitNotification = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = useCallback(({
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
    }, [api]);

    return { openNotification, contextHolder };
};
