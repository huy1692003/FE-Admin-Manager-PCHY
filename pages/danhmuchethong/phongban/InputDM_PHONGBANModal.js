import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { DM_PHONGBAN } from "../../../models/DM_PHONGBAN";
import { DM_DVIQLY } from "../../../models/DM_DVIQLY";

export const InputDM_PHONGBANModal = ({
  isUpdate,
  phongban,
  visible,
  setVisible,
}) => {
  let fakeDataTable = [];

  const [PHONGBAN, setPHONGBAN] = useState(DM_PHONGBAN);
  const [DVIQLY, setDVIQLY] = useState(DM_PHONGBAN);
  const [DVIQLYS, setDVIQLYS] = useState([]);

  const loadData = () => {
    for (let i = 1; i <= 20; i++) {
      fakeDataTable.push({
        ma_dviqly: i,
        ten_dviqly: "Đơn vị " + i,
      });
    }

    setDVIQLYS(fakeDataTable);
    if (isUpdate) {
      setPHONGBAN(phongban);
    } else {
      setPHONGBAN(DM_PHONGBAN);
    }
  };
  const getDVIQLY = (ten_dviqly) => {
    return DVIQLYS.find((d) => d.ten_dviqly === ten_dviqly);
  };
  useEffect(() => {
    setDVIQLY(getDVIQLY(PHONGBAN.ten_dviqly));
  }, [PHONGBAN.ten_dviqly]);
  useEffect(() => {
    loadData();
    console.log(isUpdate);
  }, []);

  return (
    <Dialog
      header={
        !isUpdate ? "Thêm mới danh mục phòng ban" : "Sửa danh mục phòng ban"
      }
      visible={visible}
      style={{ width: "60vw" }}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
        setPHONGBAN(null);
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div className="form__group " style={{ width: "45%" }}>
          <label htmlFor="MA" className="form__label mb-3 inline-block">
            Mã phòng ban
          </label>
          <InputText
            style={{ display: "block", width: "100%" }}
            id="MA"
            className="form__input"
            onChange={(e) => {
              console.log(e.target.value);
            }}
            type="text"
            value={PHONGBAN.ma}
          />
        </div>
        <div className="form__group" style={{ width: "45%" }}>
          <label htmlFor="TEN" className="form__label mb-3 inline-block">
            Tên phòng ban
          </label>
          <InputText
            id="TEN"
            style={{ display: "block", width: "100%" }}
            placeholder="Tên phòng ban ..."
            onChange={(e) => {}}
            type="text"
            value={PHONGBAN.ten}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div className="form__group w-2/5" style={{ width: "45%" }}>
          <label htmlFor="TRANG_THAI" className="form__label mb-3 inline-block">
            Trạng thái
          </label>
          <InputText
            id="TRANG_THAI"
            style={{ display: "block", width: "100%" }}
            onChange={(e) => {}}
            type="text"
            value={PHONGBAN.trang_thai}
          />
        </div>
        <div className="form__group w-1/2 " style={{ width: "45%" }}>
          <label htmlFor="SAP_XEP" className="form__label mb-3  inline-block">
            Sắp xếp
          </label>
          <InputText
            id="SAP_XEP"
            style={{ display: "block", width: "100%" }}
            onChange={(e) => {}}
            type="text"
            className="w-full"
            value={PHONGBAN.sap_xep}
          />
        </div>
      </div>
      <div className="">
        <div className="form__group w-full">
          <label htmlFor="SAP_XEP" className="form__label mb-3  inline-block">
            Chọn đơn vị
          </label>
          <Dropdown
            value={DVIQLY}
            options={DVIQLYS}
            onChange={(e) => setDVIQLY(e.value)}
            optionLabel="ten_dviqly"
            id="MA_DVIQLY"
            placeholder="Chọn một option"
            className="w-full mr-2"
          ></Dropdown>
        </div>
      </div>
    </Dialog>
  );
};
