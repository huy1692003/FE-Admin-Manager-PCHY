import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { PrimeIcons } from 'primereact/api'

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        // {
        //     label: 'Quản lý vật tư',
        //     items: [
        //         { label: 'Quản lý kìm', icon: 'pi pi-fw pi-id-card', to: '/phongkinhdoanh/quanlyvatlieu/kim' },
        //         { label: 'Quản lý chì', icon: 'pi pi-fw pi-check-square', to: '/phongkinhdoanh/quanlyvatlieu/temchi' },
        //     ]
        // },
        // {
        //     label: 'Quản lý phiếu',
        //     items: [
        //         {
        //             label: 'Thợ điện',
        //             icon: 'pi pi-fw pi-prime',
        //             items: [
        //                 {
        //                     label: 'Biên bản mượn kìm',
        //                     icon: PrimeIcons.BOOK,
        //                     to: "/thodien/quanlybienban/muon/kim",

        //                 },
        //                 {
        //                     label: 'Biên bản mượn tem chì',
        //                     icon: PrimeIcons.BOOK,
        //                     to: "/thodien/quanlybienban/muon/chitem",

        //                 },
        //                 {
        //                     label: 'Biên bản quyết toán kìm',
        //                     icon: PrimeIcons.BOOK,
        //                     to: "/thodien/quanlybienban/quyettoan/kim",

        //                 },
        //                 {
        //                     label: 'Biên bản quyết toán tem chì',
        //                     icon: PrimeIcons.BOOK,
        //                     to: "/thodien/quanlybienban/quyettoan/chitem",

        //                 },

        //             ]
        //         },
        //         {
        //             label: 'P6',
        //             icon: 'pi pi-fw pi-prime',
        //             items: [
        //                 {
        //                     label: 'Biên bản bàn giao kìm',
        //                     icon: PrimeIcons.BOOK
        //                 },
        //                 {
        //                     label: 'Biên bản bàn giao tem chì',
        //                     icon: PrimeIcons.BOOK
        //                 },
        //                 {
        //                     label: 'Biên bản quyết toán kìm',
        //                     icon: PrimeIcons.BOOK
        //                 },
        //                 {
        //                     label: 'Biên bản quyết toán tem chì',
        //                     icon: PrimeIcons.BOOK
        //                 },

        //             ]
        //         },
        //     ]
        // },
        // {
        //     label: 'Danh mục hệ thống',
        //     items: [
        //         {
        //             label: 'Đơn vị',
        //             icon: PrimeIcons.USER,

        //         },
        //         {
        //             label: 'Chức vụ',
        //             icon: PrimeIcons.USER
        //         },
        //         {
        //             label: 'Phòng ban',
        //             icon: PrimeIcons.USER,
        //             to: '/danhmuchethong/phongban'
        //         }
        //     ]
        // },
        {
            label: 'Quản trị hệ thống',
            items: [
                {
                    label: 'Người dùng',
                    icon: PrimeIcons.USER,
                    to: '/quantrihethong/nguoidung'

                },
                {
                    label: 'Quyền người dùng',
                    icon: PrimeIcons.USER,
                    to: '/quantrihethong/quyen_nguoidung'

                },
                {
                    label: 'Vai trò',
                    icon: PrimeIcons.USER,
                    to: '/quantrihethong/vaitro'
                },
                // {
                //     label: 'Người dùng ký số',
                //     icon: PrimeIcons.USER_EDIT
                // },
                // {
                //     label: 'Cấu hình ký số',
                //     icon: PrimeIcons.USER_EDIT
                // }
            ]
        },
        {
            label: 'Cá nhân',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Tài khoản',
                    icon: 'pi pi-fw pi-globe',
                },
                {
                    label: 'Đăng xuất',
                    icon: 'pi pi-fw pi-user',
                    to: '/auth/login'
                }
            ]
        },

    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/* <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link> */}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
