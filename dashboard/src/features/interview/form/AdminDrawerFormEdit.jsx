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

export default function AdminDrawerFormEdit({ id }) {
    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
    const { updateAdminDetail, getAllAdminsList } = usePlace();
    const { drawerSubmitLoading, setDrawerSubmitLoading } = useGlobalCtx();
    const { candidateList, hrList } = usePlaceCtx();
    const { getAllCandidateList, getAllHrList } = usePlace();
    const { edittingRowInfo } = useGlobalCtx();
    useEffect(() => {
        getAllCandidateList().then((res) => {});
        getAllHrList().then((res) => {});
    }, []);

    const [formData, setFormData] = useState({
        candidateId: edittingRowInfo?.candidateId?._id,
        hrOfficerId: edittingRowInfo?.hr._id,
        talkingSkill: edittingRowInfo?.resultId[0].talkingSkill,
        appearance: edittingRowInfo?.resultId[0].appearance,
        disadvantage: edittingRowInfo?.resultId[0].disadvantage,
        advantage: edittingRowInfo?.resultId[0].advantage,
        skills: edittingRowInfo?.resultId[0].skills,
        generalConclusion: edittingRowInfo?.resultId[0].generalConclusion,
        goodAblity: edittingRowInfo?.resultId[0].goodAblity,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        updateAdminDetail(id, formData).then((res) => {});
    };

    return (
        <form onSubmit={handleSubmit}>
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
                        value={formData.candidateId}
                        onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
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
                        htmlFor='hrOfficerId'
                    >
                        Хүний нөөцийн менежер
                    </label>
                </div>
                <div className='md:w-2/3'>
                    <select
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-4/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        id='hrOfficerId'
                        name='hrOfficerId'
                        value={formData.hrOfficerId}
                        onChange={(e) => setFormData({ ...formData, hrOfficerId: e.target.value })}
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
                        value={formData.talkingSkill}
                        onChange={(e) => setFormData({ ...formData, talkingSkill: e.target.value })}
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
                        value={formData.appearance}
                        onChange={(e) => setFormData({ ...formData, appearance: e.target.value })}
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
                        value={formData.advantage}
                        onChange={(e) => setFormData({ ...formData, advantage: e.target.value })}
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
                        value={formData.disadvantage}
                        onChange={(e) => setFormData({ ...formData, disadvantage: e.target.value })}
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
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    >
                        <option value=''>Сонгоорой...</option>
                        <option value='1'>Хангалтгүй</option>
                        <option value='2'>Дунджаас доогуур</option>
                        <option value='3'>Дундаж</option>
                        <option value='4'>Сайн</option>
                        <option value='5'>Маш сайн</option>
                    </select>
                </div>

                {/* <FormRow
                    errMsg={formState?.password?.error}
                    className='px-6 pt-6 flex-grow scrollbar-hide w-full max-h-full grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6'
                >
                    <LabelArea label='Хэрэглэгчийн нууц үг' />
                    <div className='col-span-8 sm:col-span-4'>
                        <InputPassword
                            name='password'
                            onChange={onChange}
                            value={formState?.password?.value}
                            isValid={Boolean(formState?.password?.error)}
                            placeholder=''
                        />
                    </div>
                </FormRow> */}
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
                        onChange={(e) => setFormData({ ...formData, goodAblity: e.target.value })}
                        value={formData?.goodAblity}
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
                        onChange={(e) =>
                            setFormData({ ...formData, generalConclusion: e.target.value })
                        }
                        value={formData?.generalConclusion}
                        placeholder=''
                    />
                </div>
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
                    <Button type='submit' className='w-full h-12'>
                        <span>Оруулах</span>
                    </Button>
                </div>
            </div>
        </form>
    );
}
