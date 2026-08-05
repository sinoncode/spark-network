import api from "@/api/axios";
import type { RequestResponse, RequestItem } from "@/types/request.types";
import type { RequestFormData } from "@/modules/requests/create/store/requestCreationStore";

export type RequestPayload = RequestFormData;

export const getRequests = async () => {
    const response = await api.get<RequestResponse>("/requests");
    return response.data;
};

export const getRequestById = async (id: number | string) => {
    const response = await api.get(`/requests/${id}`);
    return response.data?.data ?? response.data;
};

export const createRequest = async (payload: RequestPayload) => {
    const response = await api.post("/requests", payload);
    return response.data;
};

export const updateRequest = async (id: number | string, payload: RequestPayload) => {
    const response = await api.put(`/requests/${id}`, payload);
    return response.data;
};

export const deleteRequest = async (id: number) => {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
};

