import axiosInstance from "../axios/axiosInstance";

class AuthService {

    async login(email: string, password: string) {
        const response = await axiosInstance.post(`/user/login`, { email, password });
        return response.data;
    }
        async forgetEmail(email: string) {
            const response = await axiosInstance.post(`/auth/send-otp`, { email });
            return response.data;
        }

        async verifyOtp(email: string, otp: number) {
            const response = await axiosInstance.post(`/auth/rest-verify-otp`, { email, otp });
        return response.data;
    }
        async forgetPassword({email,newPassword,confirmPassword}:{email: string, newPassword: string, confirmPassword: string}) {
            const response = await axiosInstance.post(`/user/forget`, { email, newPassword, confirmPassword });
        return response.data;
    }

}

export default new AuthService();