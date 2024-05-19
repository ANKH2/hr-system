import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@windmill/react-ui';
import { FiUploadCloud } from 'react-icons/fi';
import LabelArea from '@/components/ui/form/selectOption/LabelArea';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';
import InputText from '@/components/ui/form/elements/input/InputText';
import usePlace from '../usePlace';
import useForm from '@/components/ui/form/store/useForm';
import FormRow from '@/components/ui/form/FormRow';
import InputFile from '@/components/ui/form/elements/input/file/InputFile';
import Uploader from '@/components/ui/image-uploader/Uploader';
import InputFileUpload from '@/components/ui/form/elements/input/file/InputFileUpload';
import InputPassword from '@/components/ui/form/elements/input/InputPassword';
import ImageViewer from '@/components/ui/form/elements/input/file/ImageViewer';
import { usePlaceCtx } from '../usePlaceCtx';
import { useGlobalCtx } from '@/common/global/useGlobalCtx';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialFormData = {
    image: { value: null, error: null },
    candidateId: { value: null, error: null },
    hrOfficerId: { value: null, error: null },
    talkingSkill: { value: null, error: null },
    appearance: { value: null, error: null },
    disadvantage: { value: null, error: null },
    advantage: { value: null, error: null },
    skills: { value: null, error: null },
    generalConclusion: { value: null, error: null },
    goodAblity: { value: null, error: null },
};

export default function AdminDrawerForm({ id }) {
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
    const { addInterview, getAllAdminsList } = usePlace();
    const { drawerSubmitLoading, setDrawerSubmitLoading } = useGlobalCtx();
    const { candidateList, hrList } = usePlaceCtx();
    const { getAllCandidateList, getAllHrList } = usePlace();

    useEffect(() => {
        getAllCandidateList().then((res) => {});
        getAllHrList().then((res) => {});
    }, []);

    const { onChange, onError, formState, setValueField } = useForm(initialFormData);

    function submitForm(e) {
        e.preventDefault();
        setDrawerSubmitLoading(true);
        const payload = new FormData();

        payload.append('candidateId', formState?.candidateId?.value);
        payload.append('hrOfficerId', formState?.hr?.value);
        payload.append('talkingSkill', formState?.talkingSkill?.value);
        payload.append('appearance', formState?.appearance?.value);
        payload.append('disadvantage', formState?.disadvantage?.value);
        payload.append('advantage', formState?.advantage?.value);
        payload.append('skills', formState?.skills?.value);
        payload.append('generalConclusion', formState?.generalConclusion?.value);
        payload.append('goodAblity', formState?.goodAblity?.value);

        addInterview(payload)
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
            <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                    <label
                        className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                        htmlFor='interviewType'
                    >
                        Ажилчдын мэдээлэл
                    </label>
                </div>
                <div className='md:w-2/3'>
                    <select
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-4/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        id='candidateId'
                        name='candidateId'
                        onChange={onChange}
                        value={formState?.candidateId?.value}
                    >
                        <option value=''>Сонгоорой...</option>
                        {candidateList.map(
                            (candidate) =>
                                candidate.type ==="processing" && (
                                    <option key={candidate?._id} value={candidate?._id}>
                                        {candidate?.lastName} {candidate?.firstName}
                                    </option>
                                ),
                        )}
                    </select>
                </div>
            </div>

            <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                    <label
                        className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                        htmlFor='hr'
                    >
                        Хүний нөөцийн менежер
                    </label>
                </div>
                <div className='md:w-2/3'>
                    <select
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-4/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        id='hr'
                        name='hr'
                        onChange={onChange}
                        value={formState?.hr?.value}
                    >
                        <option value=''>Сонгоорой...</option>
                        {hrList?.map((hr) => (
                            <option key={hr?._id} value={hr?._id}>
                                {hr?.userName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                    <label
                        className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                        htmlFor='talkingSkill'
                    >
                        Харилцаа
                    </label>
                </div>
                <div className='md:w-2/3'>
                    <select
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-4/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        id='talkingSkill'
                        name='talkingSkill'
                        onChange={onChange}
                        value={formState?.talkingSkill?.value}
                    >
                        <option value=''>Сонгоорой...</option>
                        <option value='1'>Хангалтгүй</option>
                        <option value='2'>Дунджаас доогуур</option>
                        <option value='3'>Дундаж</option>
                        <option value='4'>Сайн</option>
                        <option value='5'>Маш сайн</option>
                    </select>
                </div>
            </div>

            <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                    <label
                        className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                        htmlFor='appearance'
                    >
                        Асуултанд хариулж буй байдал
                    </label>
                </div>
                <div className='md:w-2/3'>
                    <select
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-4/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        id='appearance'
                        name='appearance'
                        onChange={onChange}
                        value={formState?.appearance?.value}
                    >
                        <option value=''>Сонгоорой...</option>
                        <option value='1'>Хангалтгүй</option>
                        <option value='2'>Дунджаас доогуур</option>
                        <option value='3'>Дундаж</option>
                        <option value='4'>Сайн</option>
                        <option value='5'>Маш сайн</option>
                    </select>
                </div>
            </div>

            <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                    <label
                        className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                        htmlFor='advantage'
                    >
                        Хандлага
                    </label>
                </div>
                <div className='md:w-2/3'>
                    <select
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-4/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        id='advantage'
                        name='advantage'
                        onChange={onChange}
                        value={formState?.advantage?.value}
                    >
                        <option value=''>Сонгоорой...</option>
                        <option value='1'>Хангалтгүй</option>
                        <option value='2'>Дунджаас доогуур</option>
                        <option value='3'>Дундаж</option>
                        <option value='4'>Сайн</option>
                        <option value='5'>Маш сайн</option>
                    </select>
                </div>
            </div>
            <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                    <label
                        className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                        htmlFor='disadvantage'
                    >
                        Идэвхи санаачлага
                    </label>
                </div>
                <div className='md:w-2/3'>
                    <select
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-4/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        id='disadvantage'
                        name='disadvantage'
                        onChange={onChange}
                        value={formState?.disadvantage?.value}
                    >
                        <option value=''>Сонгоорой...</option>
                        <option value='1'>Хангалтгүй</option>
                        <option value='2'>Дунджаас доогуур</option>
                        <option value='3'>Дундаж</option>
                        <option value='4'>Сайн</option>
                        <option value='5'>Маш сайн</option>
                    </select>
                </div>
            </div>
            <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                    <label
                        className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                        htmlFor='skills'
                    >
                        Өөрийгөө хөгжүүлэх зан чанар
                    </label>
                </div>
                <div className='md:w-2/3'>
                    <select
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-4/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        id='skills'
                        name='skills'
                        onChange={onChange}
                        value={formState?.skills?.value}
                    >
                        <option value=''>Сонгоорой...</option>
                        <option value='1'>Хангалтгүй</option>
                        <option value='2'>Дунджаас доогуур</option>
                        <option value='3'>Дундаж</option>
                        <option value='4'>Сайн</option>
                        <option value='5'>Маш сайн</option>
                    </select>
                </div>
            </div>
            <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                    <label
                        className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                        htmlFor='goodAblity'
                    >
                        Манлайлал болон багаар ажиллах
                    </label>
                </div>
                <div className='md:w-2/3'>
                    <input
                        className='w-4/5 px-3 py-2 border rounded-md '
                        type='text'
                        id='goodAblity'
                        name='goodAblity'
                        value={formState?.goodAblity?.value}
                        onChange={onChange}
                        placeholder=''
                    />
                </div>
            </div>


            

            <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                    <label
                        className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                        htmlFor='generalConclusion'
                    >
                        Ёрөнхий дүгнэлт
                    </label>
                </div>
                <div className='md:w-2/3'>
                    <input
                        className='w-4/5 px-3 py-2 border rounded-md'
                        type='text'
                        id='generalConclusion'
                        name='generalConclusion'
                        value={formState?.generalConclusion?.value}
                        onChange={onChange}
                        placeholder=''
                    />
                </div>
            </div>

            {/* Repeat similar pattern for other input fields */}
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
                        <span>Оруулах</span>
                    </Button>
                </div>
            </div>
        </form>
    );
}
