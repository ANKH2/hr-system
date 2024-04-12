import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
    TableRow,
    TableBody,
} from '@windmill/react-ui';
import { FiZoomIn } from 'react-icons/fi';
import { usePlaceCtx } from './usePlaceCtx';
import { BtnTw, OutlineBtn, OutlineBtnTw, RedBtn } from '@/components/ui/button/Button';
import { useDrawerCtx } from '@/common/drawer/useDrawerCtx';
import { DRAWER_TYPES } from '@/common/drawer/DisplayDrawer';
import placeService from './place.service';
import { excrept } from '@/libs/utils/string';
import EditDeleteButton from '@/components/ui/table/EditDeleteButton';
import useToggleDrawer from '@/common/hooks/useToggleDrawer';

import { usePopupCtx } from '@/common/popup/usePopupCtx';
import { POPUP_TYPES } from '@/common/popup/popupRegistration';

import CustomTooltip, { Tooltip } from '@/components/ui/tooltip/CustomTooltip';
import MainDrawer from '@/components/layout/drawer/MainDrawer';
import AdminsDrawer from './adminsDrawer/AdminsDrawer';
import { SidebarContext } from '@/components/layout/sidebar/SidebarContext';

function PlacesTable() {
    const history = useHistory();
    const { title, serviceId, handleModalOpen, handleUpdate, handleShow, isItInfo } =
        useToggleDrawer();
    const { placeList, pagination, setPagination, claimsListQueryParams, setPlaceList } =
        usePlaceCtx();

    const { showPopup, setPopupState } = usePopupCtx();
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    async function onPageChange(page) {
        setPagination((prev) => ({
            ...prev,
            currentPage: page,
        }));
        const payLoad = {
            ...claimsListQueryParams,
            page: page - 1,
        };
        const res = await placeService.getPlaceList(payLoad);
        setPlaceList(res);
    }

    function openModal(rowInfo) {
        showPopup(POPUP_TYPES.DELETE_INTERVIEW);
        setPopupState((prev) => ({ ...prev, deletingUserInfo: rowInfo }));
    }

    const scoreToText = (score) => {
        if (score === 1) {
            return 'Хангалтгүй';
        } else if (score === 2) {
            return 'Дунджаас доогуур';
        } else if (score === 3) {
            return 'Дундаж';
        } else if (score === 4) {
            return 'Сайн';
        } else if (score === 5) {
            return 'Маш сайн';
        } else {
            return ''; // Or handle any other cases if necessary
        }
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };
    const sortedPlaces = placeList?.slice().sort((a, b) => {
        const scoreA = a.resultId[0]?.rate;
        const scoreB = b.resultId[0]?.rate;
        if (sortOrder === 'asc') {
            return scoreA - scoreB;
        } else {
            return scoreB - scoreA;
        }
    });

    const { showDrawer } = useDrawerCtx();

    const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);

    console.log('serviceId', serviceId);
    return (
        <>
            <MainDrawer>
                <AdminsDrawer id={serviceId} />
            </MainDrawer>
            <Table>
                <TableHeader>
                    <tr>
                        <TableCell>Ажил горилигч</TableCell>
                        <TableCell>Ярилцлага авсан өдөр</TableCell>
                        <TableCell>Ярианы чадвар</TableCell>
                        <TableCell>Гадаад үзэмж</TableCell>
                        <TableCell>Давуу тал</TableCell>
                        <TableCell>Сул тал</TableCell>
                        <TableCell>Чадварууд</TableCell>
                        <TableCell>Хариу</TableCell>
                        <TableCell>Ярилцлага авсан Hr</TableCell>
                        <TableCell className='text-right'>
                            <button onClick={() => handleSort('skills')}>
                                Үйлдэлүүд{sortBy === 'skills' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </button>
                        </TableCell>
                    </tr>
                </TableHeader>

                <TableBody>
                    {sortedPlaces?.map((place) => (
                        <TableRow key={place._id}>
                            <TableCell>
                                <span className='font-semibold uppercase text-xs'>
                                    {' '}
                                    {place?.candidateId?.firstName}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{place.date}</span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>
                                    {scoreToText(place?.resultId[0]?.advantage)}
                                </span>{' '}
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>
                                    {scoreToText(place?.resultId[0]?.appearance)}
                                </span>{' '}
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>
                                    {scoreToText(place?.resultId[0]?.advantage)}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>
                                    {scoreToText(place?.resultId[0]?.disadvantage)}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>
                                    {scoreToText(place?.resultId[0]?.skills)}
                                </span>{' '}
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{place?.resultId[0]?.rate}</span>{' '}
                            </TableCell>
                            <TableCell>
                                <span className='text-sm'>{place.hr?.userName}</span>{' '}
                            </TableCell>
                            <TableCell>
                                <div className='flex justify-end text-right'>
                                    <EditDeleteButton
                                        title={place?.name}
                                        id={place?._id}
                                        edittingRowInfo={place}
                                        handleUpdate={handleUpdate}
                                        openDeleteModal={() => openModal(place)}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default PlacesTable;