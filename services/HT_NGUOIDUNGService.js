import { apiClient } from "../constants/api";
export const HT_NGUOIDUNG_Service = {
    get: async (pageIndex, pageSize) => {
        const res = await apiClient.post("HTNguoiDung/get", { pageIndex: pageIndex + "", pageSize: pageSize + "" })
        return res.data
    },
    search: async (data) => {
        const res = await apiClient.post("HTNguoiDung/search", data)
        return res.data
    },
    delete: async (user) => {
        const res = await apiClient.delete("HTNguoiDung/search", user)
        return res.data
    },
    create: async (user) => {
        const res = await apiClient.post("HTNguoiDung/create", user)
        return res.data
    },
    update: async (user) => {
        const res = await apiClient.patch("HTNguoiDung/update", user)
        return res.data
    }


}