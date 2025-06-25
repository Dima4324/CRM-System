import {
    MetaResponse,
    User,
    UserFilters,
    UserRequest,
    UserRolesRequest,
} from "../types/admin";
import { easydevApi } from "./easydevApi";

export const getUsersMeta = async (
    parameters: UserFilters
): Promise<MetaResponse<User>> => {
    try {
        const params = new URLSearchParams();

        Object.entries(parameters).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                params.append(key, String(value));
            }
        });

        const response = await easydevApi.get<MetaResponse<User>>(
            `/admin/users?${params.toString()}`
        );

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const getUserProfile = async (id: number): Promise<User> => {
    try {
        const response = await easydevApi.get<User>(`/admin/users/${id}`);

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const updateUserProfile = async (id: number, fields: UserRequest): Promise<User> => {
    try {
        const response = await easydevApi.put<User>(`/admin/users/${id}`, fields);

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const blockUser = async (id: number): Promise<User> => {
    try {
        const response = await easydevApi.post<User>(
            `/admin/users/${id}/block`
        );
        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const unlockUser = async (id: number): Promise<User> => {
    try {
        const response = await easydevApi.post<User>(
            `/admin/users/${id}/unblock`
        );
        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const updateUserRights = async (
    id: number,
    roles: UserRolesRequest
): Promise<User> => {
    try {
        const response = await easydevApi.post<User>(
            `/admin/users/${id}/rights`,
            roles
        );

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const deleteUser = async (id: number): Promise<User> => {
    try {
        const response = await easydevApi.delete<User>(`/admin/users/${id}`);

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};
