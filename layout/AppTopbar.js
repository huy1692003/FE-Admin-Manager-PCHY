import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { LayoutContext } from './context/layoutcontext';
import {Menu} from 'primereact/menu'
import { PrimeIcons } from 'primereact/api'


const AppTopbar = forwardRef((props, ref) => {

    const menuLeft = useRef(null);
    const items = [
        {
            label: 'Phòng viễn thông và công nghệ thông tin',
            icon: PrimeIcons.HOME
        },
        {
            label: 'Hoàng Văn Thuận',
            icon: PrimeIcons.USER
        },
        {
            label: 'Đổi mật khẩu',
            icon: PrimeIcons.LOCK
        }
    ]

    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src='/demo/images/login/logologin.png' widt={'true'} alt="logo" />
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button" onClick={(e) => menuLeft.current.toggle(e)}>
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                    <Menu model={items} popup id='popup_menu_left' ref={menuLeft} style={{width: '250px'}} />
                </button>
                <div style={{cursor: 'pointer'}}>
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-sync"></i>
                    </button>
                    <span className='uppercase'>công ty điện lực hưng yên</span>
                </div>
                <Link href="/auth/login">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-power-off"></i>
                        <span>Logout</span>
                    </button>
                </Link>
            </div>
        </div>
    );
});

export default AppTopbar;
