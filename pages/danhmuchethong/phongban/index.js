import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState, useEffect } from "react";
import "primeicons/primeicons.css";
import { useRouter } from "next/router";
import TableDM_PhongBan from "./TableDM_PhongBan";
import { InputDM_PHONGBANModal } from "./InputDM_PHONGBANModal";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { DM_PHONGBAN } from "../../../models/DM_PHONGBAN";
import { DM_DVIQLY } from "../../../models/DM_DVIQLY";

const PhongBan = () => {
  const [PHONGBAN, setPHONGBAN] = useState(DM_PHONGBAN);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [MA, setMA] = useState("");
  const [TEN, setTEN] = useState("");
  const [TRANG_THAI, setTRANG_THAI] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div
            className="card-header flex justify-between mb-3 items-center"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <h3 className="card-title text-lg m-0">
              Quản lý danh mục phòng ban
            </h3>
            <Button
              label="Thêm mới"
              icon="pi pi-plus"
              raised
              severity="success"
              onClick={() => {
                setVisible(true);
                setIsUpdate(false);
              }}
            />
          </div>

          <div className="card">
            <Card title="Tìm kiếm">
              <Divider style={{ marginTop: "0", marginBottom: "10px" }} />

              <div className="flex flex-col">
                <div
                  className="form__group grow"
                  style={{ flexGrow: "1", width: "33.33333%" }}
                >
                  <label htmlFor="MA" className="form__label mb-3 inline-block">
                    Mã phòng ban
                  </label>
                  <InputText
                    id="MA"
                    style={{ display: "block", width: "90%" }}
                    placeholder="Tên phòng ban ..."
                    onChange={(e) => {
                      setMA(e.value);
                    }}
                    type="text"
                    value={MA}
                  />
                </div>
                <div
                  className="form__group grow"
                  style={{
                    flexGrow: "1",
                    width: "33.33333%",
                  }}
                >
                  <label
                    htmlFor="TEN"
                    className="form__label mb-3 inline-block"
                  >
                    Tên phòng ban
                  </label>
                  <InputText
                    id="TEN"
                    style={{ display: "block", width: "90%" }}
                    placeholder="Tên phòng ban ..."
                    onChange={(e) => {
                      setTEN(e.value);
                    }}
                    type="text"
                    value={TEN}
                  />
                </div>
                <div
                  className="form__group "
                  style={{ flexGrow: "1", width: "33.33333%" }}
                >
                  <label
                    htmlFor="TRANG_THAI"
                    className="form__label mb-3 inline-block"
                  >
                    Trạng thái
                  </label>
                  <Dropdown
                    onChange={(e) => setTRANG_THAI(e.value)}
                    optionLabel="name"
                    value={TRANG_THAI}
                    id="TRANG_THAI"
                    className="w-full mr-2"
                    style={{ width: "90%" }}
                  ></Dropdown>
                </div>
              </div>
              <div className="flex mt-3" style={{ justifyContent: "center" }}>
                <Button label="Tìm kiếm" severity="info"></Button>
              </div>
            </Card>
          </div>

          <TableDM_PhongBan
            visible={visible}
            setVisible={setVisible}
            setIsUpdate={setIsUpdate}
            setPHONGBAN={setPHONGBAN}
          ></TableDM_PhongBan>
          {visible == true && (
            <InputDM_PHONGBANModal
              phongban={PHONGBAN}
              isUpdate={isUpdate}
              visible={visible}
              setVisible={setVisible}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PhongBan;
