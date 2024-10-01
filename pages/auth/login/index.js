import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import styles from './login.module.scss'

const LoginPage = () => {
    const currentYear = new Date().getFullYear()
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('  flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName} style={{backgroundColor: '#B0BEC5'}}>
            <div style={{backgroundColor: 'white', width: '93%', boxShadow: '0px 4px 8px 0px #757575'}}>
                <div className="flex justify-content-between align-items-center gap-5" style={{padding: '2rem'}}>
                    <div className={styles.loginLeftside}>
                        <div className='pb-5'>
                            <div className='row'>
                                <img src='/demo/images/login/logologin.png' style={{width: '30%'}} />
                            </div>
                        </div>
                    </div>
                    <div style={{width: '40%', paddingRight: '30px'}}>
                        <div className='mb-8'>
                            <div className='text-center'>
                                <h3 className='page-title uppercase' style={{color: '#1445a7'}}>hệ thống phần mềm pchungyen.vn</h3>
                            </div>
                            <div className='flex flex-wrap px-3 mb-4' style={{marginRight: '-15px', marginLeft: '-15px'}}>
                                <div className={styles.line}></div>
                                <small style={{width: '10%', fontWeight: 'bold', textAlign: 'center'}}>o0o</small>
                                <div className={styles.line}></div>
                            </div>
                        </div>


                        <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                            Tên đăng nhập
                        </label>
                        <InputText inputid="email1" type="text" placeholder="Tài khoản" className="w-full mb-5" style={{ padding: '1rem'}} />

                        <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                            Mật khẩu
                        </label>
                        <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mât khẩu" toggleMask className="w-full mb-5" inputClassName="w-full p-3"></Password>

                        <div className="flex align-items-center justify-content-between mb-5 gap-5">
                            <div className="flex align-items-center">
                                <Checkbox inputid="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                                <label htmlFor="rememberme1">Lưu mật khẩu</label>
                            </div>
                            <a className={`${styles.forgotPass} font-medium no-underline ml-2 text-right cursor-pointer `}>
                                Quên mật khẩu
                            </a>
                        </div>
                        <div className='text-center'>
                            <Button label="Đăng nhập" className={styles.buttonLogin} onClick={() => router.push('/')}></Button>
                        </div>
                    </div>
                </div>
                <div className='text-center py-4' style={{backgroundColor: '#1A237E'}}>
                    <div className='text-center text-white'>
                        <small className='text-center'>Copyright © {currentYear} <span style={{fontWeight: 'bold', fontSize: '14px'}}> Công ty Điện lực Hưng Yên</span> </small>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
