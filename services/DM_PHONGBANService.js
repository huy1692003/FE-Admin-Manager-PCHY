import { apiClient } from "../constants/api";

export const viewDM_PHONGBAN = async () => {
  const res = await apiClient.post("");
};

export const getDM_PHONGBANById = async (id) => {
  const res = await apiClient.get("/DM_PHONGBAN/get_DM_PHONGBANByID?ID=" + id);
  return res.data;
};
