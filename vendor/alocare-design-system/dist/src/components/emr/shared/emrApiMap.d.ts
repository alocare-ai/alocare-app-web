/**
 * Alocare API (BFF) mapping for Android EMR tablet.
 * @see https://api.alocare.net/redoc
 */
export declare const EMR_API: {
    readonly auth: {
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
    readonly worklist: {
        readonly list: "GET /worklist";
        readonly updateStatus: "PATCH /worklist/{item_id}/status";
    };
    readonly patients: {
        readonly list: "GET /patients";
        readonly detail: "GET /patients/{patient_id}";
        readonly consultations: "GET /patients/{patient_id}/consultations";
    };
    readonly consultations: {
        readonly create: "POST /consultations";
        readonly detail: "GET /consultations/{consultation_id}";
        readonly updateSoap: "PUT /consultations/{consultation_id}/soap";
        readonly submit: "POST /consultations/{consultation_id}/submit";
    };
    readonly reports: {
        readonly create: "POST /reports";
        readonly detail: "GET /reports/{report_id}";
        readonly result: "GET /reports/{report_id}/result";
        readonly validate: "POST /reports/{report_id}/validate";
    };
    readonly ai: {
        readonly session: "POST /ai/sessions";
        readonly analyze: "POST /ai/analyze";
        readonly chat: "POST /ai/chat";
    };
    readonly pharmacy: {
        readonly search: "GET /pharmacy/search";
        readonly order: "POST /pharmacy/orders";
    };
    readonly lab: {
        readonly search: "GET /lab/tests/search";
        readonly order: "POST /lab/orders";
    };
    readonly icd10: {
        readonly search: "GET /icd10/search";
    };
    readonly telemedicine: {
        readonly session: "POST /telemedicine/sessions";
        readonly end: "POST /telemedicine/{session_id}/end";
    };
};
//# sourceMappingURL=emrApiMap.d.ts.map