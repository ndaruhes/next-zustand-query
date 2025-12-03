import { useMutation } from "@tanstack/react-query";
import { AuthRepository } from "../repository/auth-repository";

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            AuthRepository.login(email, password),
    });
};
