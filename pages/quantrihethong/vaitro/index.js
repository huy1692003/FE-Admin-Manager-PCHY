import React, { useEffect, useRef, useState } from 'react'
import { Panel } from 'primereact/panel'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

const QuanLyVaiTro = () => {

    let emptyVaiTro = {
        stt: null,
        ten: '',
        trang_thai: '',
        ngay_tao: null
    }

    const [vaiTros, setVaiTros] = useState(null);
    const [vaiTro, setVaiTro] = useState(emptyVaiTro);
    const [submitted, setSubmitted] = useState(false);
    const [deleteVaiTroDialog, setDeleteVaiTroDialog] = useState(false);
    const [deleteVaiTrosDialog, setDeleteVaiTrosDialog] = useState(false);
    const [selectedVaiTros, setSelectedVaiTros] = useState(null)
    const [vaiTroDialog, setVaiTroDialog] = useState(false)

    const toast = useRef(null)
    const dt = useRef(null)

    const [trangThai, setTrangThai] = useState(null);
    const dataTrangThai = [
        { id: 1, name: 'Còn hiệu lực' },
        { id: 2, name: 'Hết hiệu lực' }
    ]

    const dataTenVaiTro = [
        {id: 1, name: 'Vai trò tra cứu thông tin'},
        {id: 2, name: 'Super Admin'},
        {id: 3, name: 'Quản trị'},
        {id: 4, name: 'Quản lý chấm công - Phòng ban'},
        {id: 5, name: 'Khách hàng tra cứu chỉ số'},
        {id: 6, name: 'Admin cấp điện lực'},
        {id: 7, name: 'Nghiệp vụ cấp 4'},
        {id: 8, name: 'Nghiệp vụ cấp 3 - Kỹ thuật'}
    ]

    const loadMockData = () => {
        let mockData = []

        const now = new Date();
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }

        for (let i = 1; i<=dataTenVaiTro.length; i++) {
            mockData.push({
                stt: i,
                ten: dataTenVaiTro[i-1].name,
                trang_thai: i % 2 == 0 ? "Còn hiệu lực" : "Hết hiệu lực",
                ngay_tao: formatDate(now)
            })
        }

        setVaiTros(mockData);
    }

    useEffect(() => {
        loadMockData()
    }, [])

    const headerList = (options) => {
        const className = `${options.className} justify-content-space-between`

        return (
            <div className={className} >
                <span className='font-bold text-2xl'>Danh sách</span>
                <Button label='Thêm mới' style={{backgroundColor: '#1445a7'}} onClick={openNewVaiTro} />
            </div>
        )
    }

    const openNewVaiTro = () => {
        setVaiTro(emptyVaiTro)
        setSubmitted(false)
        setVaiTroDialog(true)
    }

    const hideDialog = () => {
        setSubmitted(true)
        setVaiTroDialog(false)
    }

    const hideDeleteVaiTroDialog = () => {
        setDeleteVaiTroDialog(false)
    }

    const hideDeleteVaiTrosDialog = () => {
        setDeleteVaiTrosDialog(false)
    }

    const vaiTroDialogFooter = (
        <>
            <Button label='Hủy' icon='pi pi-times' text onClick={hideDialog} />
            <Button label='Lưu' icon='pi pi-check' text />
        </>
    )

    const deleteVaiTrosDialogFooter = (
        <>
            <Button label='No' icon='pi pi-times' text onClick={hideDeleteVaiTroDialog} />
            <Button label='No' icon='pi pi-check' text />
        </>
    )

    return (
        <div className='grid'>
            <div className='col-12'>
                <div className='card'>
                    <Toast ref={toast} />
                    <Panel header="Tìm kiếm">
                        <div className='flex justify-content-between p-fluid gap-3'>
                            <div className='field' style={{ width: '50%' }}>
                                <label>Tên vai trò</label>
                                <InputText style={{ width: '100%' }} />
                            </div>
                            <div className='field' style={{ width: '50%' }}>
                                <label>Trạng thái</label>
                                <Dropdown value={trangThai} onChange={(e) => setTrangThai(e.value)} options={dataTrangThai} placeholder='-- Tất cả --' optionLabel='name' />
                            </div>
                        </div>
                        <div className='flex justify-content-center mt-2'>
                            <Button label='Tìm kiếm' style={{backgroundColor: '#1445a7'}} />
                        </div>
                    </Panel>

                    <Panel headerTemplate={headerList} className='mt-4'>
                        <DataTable
                            ref={dt}
                            value={vaiTros}
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10]}
                            className='datatable-responsive mt-5'
                            showGridlines
                            paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                            currentPageReportTemplate='Showing {first} to {last} of {totalRecords} products'
                        >
                            <Column
                                selectionMode='multiple'
                                headerStyle={{ width: '4rem', backgroundColor: '#1445a7', color: '#fff' }}
                            >
                            </Column>

                            <Column
                                field='stt'
                                header='STT'
                                headerStyle={{backgroundColor: '#1445a7', color: '#fff'}}
                            ></Column>

                            <Column
                                field='ten'
                                header='Tên'
                                headerStyle={{backgroundColor: '#1445a7', color: '#fff'}}
                            ></Column>

                            <Column
                                field='trang_thai'
                                header='Trạng thái'
                                headerStyle={{backgroundColor: '#1445a7', color: '#fff'}}
                            ></Column>

                            <Column
                                field='ngay_tao'
                                header='Ngày tạo'
                                headerStyle={{backgroundColor: '#1445a7', color: '#fff'}}
                            ></Column>

                            <Column
                                header='Thao tác'
                                headerStyle={{backgroundColor: '#1445a7', color: '#fff', width: '6rem'}}
                                body={(rowData) => (
                                    <div className='flex justify-content-between gap-3'>
                                        <Button label='Sửa' style={{backgroundColor: '#1445a7'}} />
                                        <Button label='Xóa' style={{backgroundColor: '#1445a7'}} />
                                    </div>
                                )}
                            ></Column>

                        </DataTable>
                    </Panel>

                    <Dialog visible={vaiTroDialog} style={{width: '700px'}} header='Thông tin vai trò' modal className='p-fluid' onHide={hideDialog} footer={vaiTroDialogFooter} >
                        <div className='field'>
                            <label htmlFor='ten'>Tên</label>
                            <InputText required autoFocus id='ten' value={vaiTro.ten} />

                            <label htmlFor='ten'>Tên</label>
                            <InputText required autoFocus id='ten' value={vaiTro.ten} />

                            <label htmlFor='ten'>Tên</label>
                            <InputText required autoFocus id='ten' value={vaiTro.ten} />
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default QuanLyVaiTro
