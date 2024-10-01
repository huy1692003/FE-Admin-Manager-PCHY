import { apiClient } from "../constants/api"

export const HT_QUYEN_NGUOIDUNG_Service = {
    create: async (list) => {
        console.log(list)
        let res = await apiClient.post('QuyenNguoiDung/createMultiple', list)
        return true
    },
    get: async () => {
        let res = await apiClient.get('QuyenNguoiDung/get')
        return res.data
    },
    update: async (userID, quyenID) => {
        let res = await apiClient.patch('QuyenNguoiDung/update', { mA_NGUOI_DUNG: userID, mA_NHOM_TV: String(quyenID) })
        return res.data
    }

}