/**
 * Alocare API authentication endpoints (BFF).
 * @see https://api.alocare.net/redoc
 */
export declare const AUTH_API: {
    readonly login: "POST /auth/login";
    readonly forgotPassword: "POST /auth/forgot-password";
    readonly resetPassword: "POST /auth/reset-password";
    readonly changePassword: "POST /auth/change-password";
    readonly google: "POST /auth/google";
    readonly googleLink: "POST /auth/google/link";
    readonly logout: "POST /auth/logout";
    readonly refresh: "POST /auth/refresh";
    readonly profile: "GET /users/me";
};
//# sourceMappingURL=authApiMap.d.ts.map