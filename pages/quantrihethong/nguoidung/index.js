import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { SplitButton } from 'primereact/splitbutton';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel'
import { InputNumber } from 'primereact/inputnumber';
import { HT_NGUOIDUNG_Service } from '../../../services/HT_NGUOIDUNGService';
import { DialogForm } from './DialogForm';
import { DiaLogBoSung } from './DiaLogBoSung';
import { Paginator } from 'primereact/paginator';



// Thêm các đối tượng khác tương tự


const initForm = {
    id: null, // ID giả định, có thể sử dụng UUID
    teN_DON_VI: null,
    teN_PHONG_BAN: null,
    teN_CHUC_VU: null,
    dM_DONVI_ID: null, // ID đơn vị, có thể cần thay đổi
    dM_PHONGBAN_ID: null, // ID phòng ban, có thể cần thay đổi
    dM_KIEUCANBO_ID: null,
    dM_CHUCVU_ID: null, // ID chức vụ, có thể cần thay đổi
    teN_DANG_NHAP: null, // Để trống để nhập
    maT_KHAU: null, // Để trống để nhập
    hO_TEN: null, // Để trống để nhập
    email: null, // Để trống để nhập
    tranG_THAI: null, // Giá trị mặc định, có thể điều chỉnh
}
const initSearch = {}

const NguoiDung = () => {
    const [NguoiDung, setNguoiDung] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);  // Tổng số bản ghi
    const [pageSize, setPageSize] = useState(10);   // Số bản ghi trên mỗi trang
    const [pageIndex, setPageIndex] = useState(1);
    const [searchTerm, setSearchTerm] = useState(undefined);

    const [isAdd, setIsAdd] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);
    const [visibleBoSung, setvisibleBoSung] = useState(false);
    const [formData, setFormData] = useState(initForm);
    const [selectedNguoiDung, setSelectedNguoiDung] = useState([]);
    const [isDeleteMultiple, setIsDeleteMultiple] = useState(false);

    const toast = useRef(null);

    useEffect(() => {
        loadData(pageIndex, pageSize)
    }, [pageIndex, pageSize]);


    const loadData = async (pageIndex = 1, pageSize = 10) => {

        let res = await HT_NGUOIDUNG_Service.get(pageIndex, pageSize);
        if (res) {

            setNguoiDung(res.data);  // Dữ liệu của người dùng từ API
            setTotalRecords(res.total);  // Tổng số bản ghi từ API
        }

    };

    const onPageChange = (event) => {

        setPageIndex(event.page + 1);  // Cập nhật pageIndex từ sự kiện
        setPageSize(event.rows);    // Cập nhật pageSize từ sự kiện

    };



    const onEdit = (kh) => {
        setIsAdd(false);
        setFormData(kh);
        setVisibleForm(true);
    };

    const onDelete = (kh) => {
        confirmDialog({
            message: 'Bạn có chắc chắn muốn xóa khách hàng này không?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {

                    let res = await NguoiDungService.deleteNguoiDung(kh.id)
                    res && showSuccessToast(toast, "Xóa thành công khách hàng ID= " + kh.id)
                    res && loadData()
                }
                catch {
                    showErrorToast(toast, "Xóa khách hàng thất bại hãy thử lại !")
                }
            }
        });
    };


    const items = useRef([
        {
            label: 'Phân quyền',
            icon: 'pi pi-users',
            command: () => {
                setIsDeleteMultiple(false)
                setvisibleBoSung(true)
            }
        },
        {
            label: 'Xóa nhiều',
            icon: 'pi pi-user-minus',
            command: () => {
                setIsDeleteMultiple(true)
                setvisibleBoSung(true)
            }
        }
    ])

    const headerTemplate = (options) => {
        const className = `${options.className} justify-content-space-between`
        return (
            <div className={className} >
                <span className='font-bold text-xl'>Danh sách người dùng</span>
                <span>

                    {selectedNguoiDung.length > 0 && <SplitButton model={items.current} label="Bổ sung" icon="pi pi-plus" severity={"success"} rounded />}
                    <Button icon="pi pi-sync" style={{ backgroundColor: "#1146A6" }} className='background-blue text-sm mr-1 ml-1' label='Đồng bộ' onClick={() => {
                        loadData()

                    }} />
                    <Button icon="pi pi-plus-circle" style={{ backgroundColor: "#1146A6" }} className='background-blue text-sm' label='Thêm mới' onClick={() => {
                        setIsAdd(true);
                        setFormData(initForm);
                        setVisibleForm(true);
                    }} />
                </span>
            </div>
        )
    }



    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className='border-round-3xl bg-white p-4 text-lg'>
                <Panel header="Tìm kiếm">
                    <div className='flex flex-wrap p-fluid gap-3'>
                        <div className='field w-4' >
                            <label>Họ tên</label>
                            <InputText style={{ width: '100%' }} />
                        </div>
                        <div className='field w-4' >
                            <label>Tên đăng nhập</label>
                            <InputText style={{ width: '100%' }} />
                        </div>
                        <div className='field w-3' >
                            <label>Trạng thái</label>
                            <Dropdown placeholder='-- Tất cả --' optionLabel='name' options={[{ id: 1, name: 'Còn hiệu lực' }, { id: 2, name: 'Hết hiệu lực' }]} />
                        </div>
                        <div className='field w-4' >
                            <label>Đơn vị</label>
                            <Dropdown placeholder='-- Chọn đơn vị --' optionLabel='name' />
                        </div>
                        <div className='field w-4' >
                            <label>Chức vụ</label>
                            <Dropdown placeholder='-- Tất cả --' optionLabel='name' />
                        </div>
                    </div>
                    <div className='flex justify-content-center mt-2'>
                        <Button label='Tìm kiếm' style={{ backgroundColor: '#1445a7' }} />
                    </div>
                </Panel>
                <p className="mt-4 mb-2">* Ghi chú : <span style={{ color: "red" }}>Tích chọn vào những người cần thao tác sẽ hiển thị nút Bổ sung để Phân Quyền hoặc Xóa nhiều .</span> </p>
                <Panel headerTemplate={headerTemplate}  >
                    <DataTable
                        selection={selectedNguoiDung}
                        onSelectionChange={(e) => { setSelectedNguoiDung(e.value) }} dataKey='teN_DANG_NHAP'
                        value={NguoiDung} showGridlines
                        style={{ fontSize: 12, fontWeight: "" }}
                    >

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="hO_TEN" header="Họ tên" className="w-2" />
                        <Column field="teN_DANG_NHAP" header="Tên đăng nhập" className="w-2" />
                        <Column field="teN_DONVI" header="Tên Đơn vị" className="w-3" />
                        <Column field="email" header="Email" className="w-2" />
                        <Column field="teN_CHUCVU" header="Chức vụ" className="w-2" />
                        <Column field="tranG_THAI" header="Trạng thái" body={(row) => <span>{`${row.tranG_THAI === 0 ? "Hết" : "Còn"} hiệu lực`}</span>} className="w-2" />
                        <Column header="Thao tác" style={{ width: 100 }} body={(rowData) => {

                            return (
                                <span className="flex  w-1">
                                    <Button size='small' className="w-1rem h-2rem p-3 mr-1" style={{ backgroundColor: "#1146A6" }} icon="pi pi-lock" />
                                    <Button size='small' className="w-1rem h-2rem p-3 mr-1" style={{ backgroundColor: "#1146A6" }} icon="pi pi-user-plus" onClick={() => {
                                        setIsAdd(true);
                                        setFormData(initForm);
                                        setVisibleForm(true);
                                    }} />
                                    <Button size='small' className="w-1rem h-2rem p-3 mr-1" style={{ backgroundColor: "#1146A6" }} icon="pi pi-user-edit" onClick={() => onEdit(rowData)} />
                                    <Button size='small' className="w-1rem h-2rem p-3 mr-1 p-button-danger" icon="pi pi-trash" />
                                    <Button size='small' className="w-1rem h-2rem p-3 mr-1" style={{ backgroundColor: "#1146A6" }} icon="pi pi-sync" />
                                </span>
                            )
                        }} />
                    </DataTable>
                    {totalRecords > 0
                        &&
                        <Paginator
                            first={((pageIndex - 1) * pageSize)}  // Vị trí đầu tiên của trang hiện tại
                            rows={pageSize}
                            totalRecords={totalRecords}
                            onPageChange={onPageChange}
                            rowsPerPageOptions={[5, 10, 20, 50]}
                        />}
                </Panel>
            </div>

            <DiaLogBoSung isDeleteMultiple={isDeleteMultiple} dataSelected={selectedNguoiDung} setDataSelected={setSelectedNguoiDung} visible={visibleBoSung} setVisible={setvisibleBoSung} toast={toast} />
            <DialogForm isAdd={isAdd}
                toast={toast}
                formData={formData}
                setFormData={setFormData}
                loadData={loadData}
                visible={visibleForm}
                setVisible={setVisibleForm} />
        </>
    );
};
export default NguoiDung
