export const getAccessToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
};

export const setAccessToken = (token: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
    }
};

export const clearAccessToken = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
    }
};
