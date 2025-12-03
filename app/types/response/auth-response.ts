import { BaseResponse } from "./base-response";

export interface LoginData {
    role: string;
    token: string;
}

export default interface LoginResponse extends BaseResponse {
    data: LoginData;
}