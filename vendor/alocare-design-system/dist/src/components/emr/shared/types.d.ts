/** Mirrors alocare-api worklist / consultation shapes for UI props. */
export type EMRWorklistStatus = "pending" | "in_progress" | "completed" | "cancelled";
export type EMRWorklistPatient = {
    id: string;
    patientId: string;
    fullName: string;
    admissionNo: string;
    mrn: string;
    insurance: string;
    status: EMRWorklistStatus;
    ward?: string;
};
export type EMRSoapFields = {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
    icd10Code?: string;
};
export type EMRMedicationLine = {
    id: string;
    name: string;
    dose: string;
    availability: "available" | "limited" | "unavailable";
};
export type EMRLabOrderLine = {
    id: string;
    name: string;
    category: "LAB" | "RAD";
    note?: string;
    priority?: "routine" | "urgent";
};
//# sourceMappingURL=types.d.ts.map