import { apiClient } from "../constants/api"

export const HT_NHOM_QUYEN_Service = {
    getDVIQLY: async () => {
        let res = await apiClient.get('HTNhomQuyen/donvi-quanly')
        return res.data
    },
    getQuyen_byDVIQLY: async (maDVIQLY) => {
        let res = await apiClient.get(`HTNhomQuyen/nhomquyen/${maDVIQLY}`)
        return res.data
    }
}