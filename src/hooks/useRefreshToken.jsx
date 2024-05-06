import axiosCustom, { axiosPrivate } from "../services/api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const {auth, setAuth} = useAuth();

    const refresh = async() => {
        const response = await axiosCustom.post('/api/v1/auth/refresh-token', null, {
            headers: {
              'Authorization': `Bearer ${auth.accessToken}`
            },
            withCredentials: true
          });

        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.access_token
            }
        });
        return response.data.access_token;
    }

    return refresh
}

export default useRefreshToken;