import { Navigate, useLocation } from "react-router-dom";
import { MainAppLayout } from "../Layouts/MainAppLayout";
import { refreshTokenRequest, tokensStorage } from "../../api/user";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getProfileInfoAction } from "../../store/actions/profileActions";
import { Loader } from "../Loader/Loader";

export const CheckAuth = () => {
    const profile = useAppSelector((state) => state.profile.profileInfo);

    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const dispatch = useAppDispatch();

    const location = useLocation();

    useEffect(() => {
        const checkToken = async () => {
            const refreshToken = tokensStorage.refreshToken;
            const accessToken = tokensStorage.accessToken;
            if (refreshToken) {
                if (!accessToken) {
                    try {
                        const tokens = await refreshTokenRequest({
                            refreshToken,
                        });
                        tokensStorage.accessToken = tokens.accessToken;
                        tokensStorage.refreshToken = tokens.refreshToken;

                        if (!profile) {
                            await dispatch(getProfileInfoAction()).unwrap();
                        }

                        setIsAuth(true);
                    } catch {
                        setIsAuth(false);
                    }
                } else {
                    if (!profile) {
                        await dispatch(getProfileInfoAction()).unwrap();
                    }
                    setIsAuth(true);
                }
            } else {
                setIsAuth(false);
            }
            setIsLoading(false);
        };

        checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    if (isLoading) {
        return (
            <Loader styles={{ height: "100vh" }}/>
        );
    }

    if (!isAuth) {
        return <Navigate to="/auth" replace />;
    }

    return <MainAppLayout />;
};
