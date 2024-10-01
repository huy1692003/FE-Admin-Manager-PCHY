import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useRef, useState, useEffect } from "react";
import "primeicons/primeicons.css";
import { useRouter } from "next/router";
const QuanLyBienBanMuonKim = () => {
  const router = useRouter();
  const BienBanKim = {
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
  const [bienBan, setBienBan] = useState(BienBanKim);
  const [visible, setVisible] = useState(false);
  const [bienBans, setBienBans] = useState([BienBanKim]);
  const data_TrangThai = [
    { id: 1, name: "Trạng thái 1" },
    { id: 2, name: "Trạng thái 2" },
  ];

  const data_LoaiVanBan = [
    { id: 1, name: "Loại văn bản 1" },
    { id: 2, name: "Loại văn bản 2" },
  ];
  const data_VatTu = [
    { id: 1, name: "Chì" },
    { id: 2, name: "Tem" },
  ];
  const data_DonViTinh = [
    { id: 1, name: "Viên" },
    { id: 2, name: "Cái" },
  ];
  const data_DonVi = [
    { id: 1, name: "Công ty điện lực Hưng Yên" },
    { id: 2, name: "Điện lực Khoái Châu" },
    { id: 3, name: "Điện lực Văn Giang" },
    { id: 4, name: "Điện lực Văn Lâm" },
    { id: 5, name: "Điện lực Yên Mỹ" },
    { id: 6, name: "Điện lực Mỹ Hào" },
  ];
  const data_Users = [
    { id: 1, name: "Nguyễn Văn A" },
    { id: 2, name: "Nguyễn Văn B" },
    { id: 3, name: "Nguyễn Văn C" },
    { id: 4, name: "Nguyễn Văn D" },
    { id: 5, name: "Nguyễn Văn E" },
  ];

  const [donViGiao, setDonViGiao] = useState();
  const [donViNhan, setDonViNhan] = useState();
  const [loaiBienBan, setLoaiBienBan] = useState();
  const [trangThai, setTrangThai] = useState();
  const loadData = () => {
    let fakeDataTable = [];
    for (let i = 1; i <= 20; i++) {
      fakeDataTable.push({
        ID: i,
        SO_LUONG_GIAO: i + 1,
        SO_LUONG_TRA: i,
        SO_LUONG_THUHOI: i,
        LOAI: i % 2 == 0 ? "Chì" : "Tem",
        DONVI_TINH: i % 2 == 0 ? "Viên" : "Cái",
        DON_VI_GIAO: `Đơn vị${i}`,
        DON_VI_NHAN: `Đơn vị${i + 1}`,
        NGUOI_NHAN: `A${i}`,
        NGUOI_GIAO: `B${i}`,
        NGAY_GIAO: "",
        NGAY_NHAN: "",
        LOAI_BBAN: "Biên bản quyết toán",
        NOI_DUNG: "",
        TRANG_THAI: "Fake trạng thái",
      });
    }
    setBienBans(fakeDataTable);
  };
  useEffect(() => {
    loadData();
  }, []);

  const rightToolbarTemplate = () => {
    return (
      <div className="flex flex-col">
        <Dropdown
          value={loaiBienBan}
          onChange={(e) => setLoaiBienBan(e.value)}
          options={data_LoaiVanBan}
          optionLabel="name"
          placeholder="Loại biên bản"
          className="w-full md:w-14rem mr-2"
        />
        <Dropdown
          value={trangThai}
          onChange={(e) => setTrangThai(e.value)}
          options={data_TrangThai}
          optionLabel="name"
          placeholder="Trạng thái"
          className="w-full md:w-14rem mr-2"
        />
        <div className="mr-2">
          <InputText type="date"> </InputText>
        </div>
        <div className="mr-2">
          <InputText placeholder="Từ khóa" />
          <Button icon="pi pi-search" className="p-button-primary" />
        </div>
      </div>
    );
  };

  const buttonGetDetail = (rowData) => {
    return (
      <>
        <Button
          style={{ marginRight: "10px" }}
          severity="info"
          icon="pi pi-eye"
          rounded
          onClick={() => {
            router.push({
              pathname: "/thodien/quanlybienban/chitiet/chitem",
              query: {
                data: JSON.stringify(rowData),
              },
            });
          }}
        />
        <Button label="" icon="pi pi-download" severity="info" rounded />
      </>
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div
            className="card-header flex justify-between mb-3 items-center"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <h3 className="card-title text-lg m-0">
              Quản lý Biên bản mượn kìm
            </h3>
            <Button
              label="Thêm mới"
              icon="pi pi-plus"
              raised
              severity="success"
              onClick={() => setVisible(true)}
            />
          </div>
          <Toolbar
            className="mb-4 flex-col"
            end={rightToolbarTemplate}
          ></Toolbar>
          <DataTable
            value={bienBans}
            showGridlines
            stripedRows
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          >
            <Column sortable field="ID" header="STT"></Column>
            <Column field="LOAI" header="Loại"></Column>
            <Column field="NGUOI_GIAO" header="Người giao"></Column>
            <Column field="NGUOI_NHAN" header="Người nhận"></Column>
            <Column field="SO_LUONG_GIAO" header="Số lượng mượn"></Column>
            <Column field="DONVI_TINH" header="Đơn vị tính"></Column>
            <Column field="TRANG_THAI" header="Trạng thái"></Column>
            <Column body={buttonGetDetail} header="Thao tác "></Column>
          </DataTable>
          <Dialog
            header="Thêm mới biên bản"
            visible={visible}
            style={{ width: "60vw" }}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Dropdown
                value={bienBan.LOAI_BBAN}
                onChange={(e) => setBienBan({ ...bienBan, LOAI_BBAN: e.value })}
                options={data_LoaiVanBan}
                optionLabel="name"
                placeholder="Loại biên bản"
                className="w-full md:w-14rem mr-2"
              />
              <Dropdown
                value={bienBan.LOAI}
                onChange={(e) => setBienBan({ ...bienBan, LOAI: e.value })}
                options={data_VatTu}
                optionLabel="name"
                placeholder="Loại vật tư"
                className="w-full md:w-14rem mr-2"
              />
              <Dropdown
                value={bienBan.DONVI_TINH}
                onChange={(e) =>
                  setBienBan({ ...bienBan, DONVI_TINH: e.value })
                }
                options={data_DonViTinh}
                optionLabel="name"
                placeholder="Đơn vị tính"
                className="w-full md:w-14rem mr-2"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <InputText
                style={{ width: "30%" }}
                id="so_luong_giao"
                placeholder="Số lượng giao ..."
                onChange={(e) =>
                  setBienBan({
                    ...bienBan,
                    SO_LUONG_GIAO: Number(e.target.value),
                  })
                }
                type="number"
                value={bienBan.SO_LUONG_GIAO}
              />
              <InputText
                id="so_luong_tra"
                style={{ width: "30%" }}
                placeholder="Số lượng trả ..."
                onChange={(e) => {
                  setBienBan({
                    ...bienBan,
                    SO_LUONG_TRA: Number(e.target.value),
                  });
                }}
                type="number"
                value={bienBan.SO_LUONG_TRA}
              />
              <InputText
                style={{ width: "30%" }}
                id="so_luong_thui_hoi"
                placeholder="Số lượng thu hồi ..."
                onChange={(e) =>
                  setBienBan({
                    ...bienBan,
                    SO_LUONG_THUHOI: Number(e.target.value),
                  })
                }
                type="number"
                value={bienBan.SO_LUONG_THUHOI}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Dropdown
                value={bienBan.DON_VI_GIAO}
                onChange={(e) =>
                  setBienBan({ ...bienBan, DON_VI_GIAO: e.value })
                }
                options={data_DonVi}
                optionLabel="name"
                id="don_vi_giao"
                placeholder="Đơn vị giao"
                className="w-full md:w-14rem mr-2"
              />

              <Dropdown
                value={bienBan.DON_VI_NHAN}
                onChange={(e) =>
                  setBienBan({ ...bienBan, DON_VI_NHAN: e.value })
                }
                options={data_DonVi}
                optionLabel="name"
                id="don_vi_nhan"
                placeholder="Đơn vị nhận"
                className="w-full md:w-14rem mr-2"
              />

              <Dropdown
                value={bienBan.NGUOI_NHAN}
                onChange={(e) =>
                  setBienBan({ ...bienBan, NGUOI_NHAN: e.value })
                }
                options={data_Users}
                optionLabel="name"
                id="nguoi_nhan"
                placeholder="Người nhận"
                className="w-full md:w-14rem mr-2"
              />

              <Dropdown
                value={bienBan.NGUOI_GIAO}
                onChange={(e) =>
                  setBienBan({ ...bienBan, NGUOI_GIAO: e.value })
                }
                options={data_Users}
                optionLabel="name"
                id="nguoi_giao"
                placeholder="Người giao"
                className="w-full md:w-14rem mr-2"
              />
            </div>
            <InputText
              id="noi_dung"
              style={{ width: "30%" }}
              placeholder="Nội dung ..."
              onChange={(e) => setBienBan({ ...bienBan, NOI_DUNG: e.value })}
              value={bienBan.NOI_DUNG}
            />
            <div className="card flex justify-content-center">
              <InputTextarea
                autoResize
                placeholder="Nội dung ..."
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                rows={5}
                cols={30}
              />
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default QuanLyBienBanMuonKim;
