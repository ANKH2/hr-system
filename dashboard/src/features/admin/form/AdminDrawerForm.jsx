import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@windmill/react-ui';
import { FiUploadCloud } from 'react-icons/fi';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import InputText from '@/components/ui/form/elements/input/InputText';
import useAdmins from '../useAdmins';
import useForm from '@/components/ui/form/store/useForm';
import FormRow from '@/components/ui/form/FormRow';
import InputFile from '@/components/ui/form/elements/input/file/InputFile';
import Uploader from '@/components/ui/image-uploader/Uploader';
import InputFileUpload from '@/components/ui/form/elements/input/file/InputFileUpload';
import InputPassword from '@/components/ui/form/elements/input/InputPassword';
import ImageViewer from '@/components/ui/form/elements/input/file/ImageViewer';
import { useAdminCtx } from '../useAdminCtx';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import { toast } from 'react-toastify';

const initialFormData = {
    image: { value: null, error: null },
    userName: { value: null, error: null },
    password: { value: null, error: null },
};

export default function AdminDrawerForm({ id }) {
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
    const { addAdmin, getAllAdminsList } = useAdmins();
    const { drawerSubmitLoading, setDrawerSubmitLoading } = useGlobalCtx();

    const { onChange, onError, formState, setValueField } = useForm(initialFormData);

    function submitForm(e) {
        e.preventDefault();
        setDrawerSubmitLoading(true);
        const payload = new FormData();

        payload.append('userName', formState?.userName?.value);
        payload.append('password', formState?.password?.value);

        addAdmin(payload)
            .then((res) => {
                if (res.status === 'success') {
                    toast('Successfully', { type: 'success' });
                    toggleDrawer();
                    getAllAdminsList();
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setDrawerSubmitLoading(false);
            });
    }

    return (
        <form>
            <div className='px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40'>
                <FormRow
                    errMsg={formState?.userName?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='Админ нэр' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputText
                            name='userName'
                            onChange={onChange}
                            value={formState?.userName?.value}
                            isValid={Boolean(formState?.userName?.error)}
                            placeholder=''
                        />
                    </div>
                </FormRow>
                <FormRow
                    errMsg={formState?.password?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='Нууц үг' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputPassword
                            name='password'
                            onChange={onChange}
                            value={formState?.password?.value}
                            isValid={Boolean(formState?.password?.error)}
                            placeholder=''
                        />
                    </div>
                </FormRow>
            </div>
            <div
                className='fixed z-10 bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                style={{ right: !isDrawerOpen && -50 }}
            >
                <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                    <Button
                        onClick={toggleDrawer}
                        className='h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700'
                        layout='outline'
                    >
                        Болих
                    </Button>
                </div>
                <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
                    <Button
                        onClick={submitForm}
                        disabled={drawerSubmitLoading}
                        className='w-full h-12'
                    >
                        <span>{drawerSubmitLoading ? '로드 중...' : 'Оруулах'}</span>
                    </Button>
                </div>
            </div>
        </form>
    );
}
