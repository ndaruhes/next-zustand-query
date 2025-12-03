import http from "@/config/axios/http";
import LoginResponse from "@/types/response/auth-response";

export const AuthRepository = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const { data } = await http.post("/auth/login", { email, password });
        return data;
    }
}
