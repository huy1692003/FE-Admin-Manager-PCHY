import React from "react";

const ChiTietBienBanKim = () => {
  const BienBanTemChi = {
    ID: null,
    SO_LUONG_GIAO: null,
    SO_LUONG_TRA: null,
    SO_LUONG_THUHOI: null,
    LOAI: "",
    DONVI_TINH: "",
    DON_VI_GIAO: "",
    DON_VI_NHAN: "",
    NGUOI_NHAN: "",
    NGUOI_GIAO: "",
    NGAY_GIAO: "",
    NGAY_NHAN: "",
    LOAI_BBAN: null,
    NOI_DUNG: "",
    TRANG_THAI: null,
  };
  const router = useRouter();
  const { data } = router.query;
  const [bienBan, setBienBan] = useState(JSON.parse(data));
  console.log(bienBan);
  return (
    <>
      <Panel header="Chi tiết">
        <p className="mb-2">ID: {bienBan.ID}</p>
        <p className="mb-2">Loại: {bienBan.LOAI}</p>
        <p className="mb-2">Số lượng giao: {bienBan.SO_LUONG_GIAO}</p>
        <p className="mb-2">Dơn vị tính: {bienBan.DONVI_TINH}</p>
        <p className="mb-2">Đơn vị giao: {bienBan.DON_VI_GIAO}</p>
      </Panel>
    </>
  );
};
export default ChiTietBienBanKim;
