import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { HT_NGUOIDUNG_Service } from "../../../services/HT_NGUOIDUNGService";

export const DialogForm = ({ isAdd, formData, setFormData, visible, setVisible, toast, loadData }) => {

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        console.log(formData)
        if (formData.teN_DANG_NHAP && formData.hO_TEN) {
            setLoading(true);
            try {
                const res = isAdd
                    ? await HT_NGUOIDUNG_Service.create(formData)
                    : await HT_NGUOIDUNG_Service.update(formData);

                res && toast.current.show({ severity: 'success', summary: 'Thông báo!', detail: `${(isAdd ? "Thêm" : "Sửa") + " thành công người dùng."} `, life: 3000 });
                res && loadData();

            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Thông báo!', detail: `${(isAdd ? "Thêm" : "Sửa") + " thất bại "} `, life: 3000 });
            } finally {
                setLoading(false);
            }
        } else {
            toast.current.show({ severity: 'error', summary: 'Thông báo!', detail: `${(isAdd ? "Thêm" : "Sửa") + " thất bại "} `, life: 3000 });
        }
    };

    const trangThaiOptions = [
        { label: 'Còn hiệu lực', value: 1 },
        { label: 'Hết hiệu lực', value: 0 }
    ];

    const gioiTinhOptions = [
        { label: 'Nam', value: 1 },
        { label: 'Nữ', value: 0 }
    ];

    return (
        <Dialog position={"top"} header={<h4>{(isAdd ? "Thêm mới" : "Sửa thông tin") + " người dùng"}</h4>} visible={visible} className='w-8' onHide={() => setVisible(false)}>
            <div className="p-fluid border-solid p-4 border-100 border-round-2xl">
                <div className="form-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>

                    {/* Dòng 1 */}
                    <div className="field-item" style={{ flex: '1 1 calc(50% - 1rem)' }}>
                        <label className='font-bold text-sm my-3 inline-block' htmlFor="teN_DANG_NHAP">Tên đăng nhập</label>
                        <InputText id="teN_DANG_NHAP" name="teN_DANG_NHAP" value={formData.teN_DANG_NHAP} onChange={handleInputChange} />
                    </div>
                    {isAdd && <div className="field-item" style={{ flex: '1 1 calc(50% - 1rem)' }}>
                        <label className='font-bold text-sm my-3 inline-block' htmlFor="teN_DANG_NHAP">Mật khẩu</label>
                        <InputText id=" maT_KHAU" name="teN_DANG_NHAP" value={formData.maT_KHAU} onChange={handleInputChange} />
                    </div>}
                    <div className="field-item" style={{ flex: '1 1 calc(50% - 1rem)' }}>
                        <label className='font-bold text-sm my-3 inline-block' htmlFor="hO_TEN">Họ tên</label>
                        <InputText id="hO_TEN" name="hO_TEN" value={formData.hO_TEN} onChange={handleInputChange} />
                    </div>

                    {/* Dòng 2 */}
                    <div className="field-item" style={{ flex: '1 1 calc(50% - 1rem)' }}>
                        <label className='font-bold text-sm my-3 inline-block' htmlFor="email">Email</label>
                        <InputText id="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="field-item" style={{ flex: '1 1 calc(50% - 1rem)' }}>
                        <label className='font-bold text-sm my-3 inline-block' htmlFor="dM_DONVI_ID">Đơn vị</label>
                        <InputText id="dM_DONVI_ID" name="dM_DONVI_ID" value={formData.dM_DONVI_ID} onChange={handleInputChange} />
                    </div>

                    {/* Dòng 3 */}
                    <div className="field-item" style={{ flex: '1 1 calc(50% - 1rem)' }}>
                        <label className='font-bold text-sm my-3 inline-block' htmlFor="dM_PHONGBAN_ID">Phòng ban</label>
                        <InputText id="dM_PHONGBAN_ID" name="dM_PHONGBAN_ID" value={formData.dM_PHONGBAN_ID} onChange={handleInputChange} />
                    </div>
                    <div className="field-item" style={{ flex: '1 1 calc(50% - 1rem)' }}>
                        <label className='font-bold text-sm my-3 inline-block' htmlFor="dM_CHUCVU_ID">Chức vụ</label>
                        <InputText id="dM_CHUCVU_ID" name="dM_CHUCVU_ID" value={formData.dM_CHUCVU_ID} onChange={handleInputChange} />
                    </div>

                    {/* Dòng 4 */}
                    <div className="field-item" style={{ flex: '1 1 calc(50% - 1rem)' }}>
                        <label className='font-bold text-sm my-3 inline-block' htmlFor="tranG_THAI">Trạng thái</label>
                        <Dropdown id="tranG_THAI" name="tranG_THAI" value={formData.tranG_THAI} options={trangThaiOptions} onChange={handleInputChange} />
                    </div>
                    <div className="field-item" style={{ flex: '1 1 calc(50% - 1rem)' }}>
                        <label className='font-bold text-sm my-3 inline-block' htmlFor="gioI_TINH">Giới tính</label>
                        <Dropdown id="gioI_TINH" name="gioI_TINH" value={formData.gioI_TINH} options={gioiTinhOptions} onChange={handleInputChange} />
                    </div>

                    {/* Dòng 5 */}
                    <div className="field-item" style={{ flex: '1 1 calc(50% - 1rem)' }}>
                        <label className='font-bold text-sm my-3 inline-block' htmlFor="sO_DIEN_THOAI">Số điện thoại</label>
                        <InputText id="sO_DIEN_THOAI" name="sO_DIEN_THOAI" value={formData.sO_DIEN_THOAI} onChange={handleInputChange} />
                    </div>
                    <div className="field-item" style={{ flex: '1 1 calc(50% - 1rem)' }}>
                        <label className='font-bold text-sm my-3 inline-block' htmlFor="sO_CMND">Số CMND</label>
                        <InputText id="sO_CMND" name="sO_CMND" value={formData.sO_CMND} onChange={handleInputChange} />
                    </div>
                </div>
            </div>

            {/* Nút hành động */}
            <div className='flex justify-content-end gap-2 mt-4'>
                <Button label="Hủy" icon="pi pi-times" onClick={() => setVisible(false)} className='p-button-outlined' />
                <Button label={isAdd ? "Thêm mới" : "Lưu"} icon="pi pi-check" loading={loading} onClick={handleSubmit} />
            </div>
        </Dialog>
    );
};
