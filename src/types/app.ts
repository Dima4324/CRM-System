import { ArgsProps } from "antd/es/notification";
import { Roles } from "./admin";

export interface NotificationProps {
    message: string;
    component: React.ReactElement;
    description?: string | React.ReactNode;
    placement?: ArgsProps["placement"];
    showProgress?: boolean;
    pauseOnHover?: boolean;
}

export interface UserInfo {
    id: number | null;
    roles: Roles[];
}