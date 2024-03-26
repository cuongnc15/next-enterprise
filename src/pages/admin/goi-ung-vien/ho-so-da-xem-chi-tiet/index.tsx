import { NextPage } from 'next';
import { Form, Input, InputNumber, message, PaginationProps, Select } from 'antd';
import img from '../../../../../public/images/ImgPic.png';
import Image from 'next/image';
import Modal from '../../../../components/Modal/indexModal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Pagination } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const DetailCV: NextPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState('Trần Đức Nam');
  const [trClick, setTrClick] = useState(null);
  const openModal = (e: any, item: any) => {
    e.target.offsetParent.classList.add('bg-[#eaeaead1]');
    setTrClick(e.target.offsetParent);
    setModalData(item.name);
    setModalOpen(true);
  };
  const closeModal = () => {
    trClick.classList.remove('bg-[#eaeaead1]');
    setTrClick(null);
    setModalOpen(false);
  };
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
  };
  const sortByOption = [
    { value: '0', label: 'All' },
    { value: '1', label: 'Sale & Marketing' },
    { value: '2', label: 'Công nghệ thông tin' },
    { value: '3', label: 'Tài chính - Kế toán' },
    { value: '4', label: 'Vận hành' },
  ];
  const genderOption = [
    { value: '1', label: 'Nam' },
    { value: '2', label: 'Nữ' },
    { value: '3', label: 'Khác' },
  ];
  const fieldOption = [
    { value: '1', label: 'Sale & Marketing' },
    { value: '2', label: 'Công nghệ thông tin' },
    { value: '3', label: 'Tài chính - Kế toán' },
    { value: '4', label: 'Vận hành' },
  ];
  const statusOption = [
    { value: '1', label: 'Chưa xem' },
    { value: '2', label: 'Đã xem' },
    { value: '3', label: 'Tiếp nhận' },
    { value: '4', label: 'Loại bỏ' },
  ];
  const handleChangeSortBy = (value: string) => {
    console.log(`selected ${value}`);
  };
  const [users, setUsers] = useState([]);
  const seenStatus: number = 1;

  const data = [
    {
      id: 1,
      name: 'cường',
      dateOfBirh: '01/27/1991',
      gender: 'Nam',
      field: 'Sale & Marketing',
      status: 1,
      mark: 85,
    },
    {
      id: 2,
      name: 'cường',
      dateOfBirh: '01/27/1991',
      gender: 'Nam',
      field: 'Sale & Marketing',
      status: 2,
      mark: 85,
    },
    {
      id: 3,
      name: 'cường3',
      dateOfBirh: '01/27/1991',
      gender: 'Nam',
      field: 'Sale & Marketing',
      status: 3,
      mark: 85,
    },
    {
      id: 4,
      name: 'cường4',
      dateOfBirh: '01/27/1991',
      gender: 'Nam',
      field: 'Sale & Marketing',
      status: 4,
      mark: 85,
    },
  ];
  return (
    <>
      <div className="flex items-center gap-2 h-[20px]">
        <a className="text-[#696974]">Trang chủ</a>
        <FontAwesomeIcon className="text-[#696974] h-[10px]" icon={faAnglesRight} />
        <a className="text-[#000000]">Hồ sơ đã xem chi tiết</a>
      </div>
      <div className="bg-white p-[15px]">
        <div className="grid grid-cols-6 gap-[15px]">
          <Input
            size="large"
            className="rounded-[10px]"
            type="text"
            placeholder="Tên ứng viên"
          />

          <Select
            size="large"
            className="w-full"
            options={genderOption}
            placeholder="Giới tính"
            id=""
          ></Select>

          <Select
            size="large"
            className="w-full"
            options={fieldOption}
            placeholder="Lĩnh vực"
            id=""
          ></Select>

          <Input
            size="large"
            className="rounded-[10px]"
            type="text"
            placeholder="Số điểm"
          />

          <Select
            size="large"
            className="w-full"
            options={statusOption}
            placeholder="Trạng thái"
            id=""
          ></Select>

          <div className=" text-white ">
            <button className="bg-[#403ECC] w-full p-[10px] rounded-[10px] text-center">
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center p-3">
          <p className="text-[#22216D]  text-[34px] p-4 font-[600]">Danh sách ứng viên</p>
          <div>
            Sort by:
            <Select
              className="ml-3"
              size="large"
              onChange={handleChangeSortBy}
              defaultValue="1"
              placeholder="Sort by:"
              options={sortByOption}
              id=""
            ></Select>
          </div>
        </div>
      </div>
      <table className="w-full">
        <thead className="bg-[#F1F1F5] px-[20px] py-[10px] text-[#92929D] font-[500] text-[16px]">
          <tr className=" px-[20px] py-[10px]">
            <td className=" px-[20px] py-[10px]">TÊN ỨNG VIÊN</td>
            <td>NGÀY SINH</td>
            <td>GIỚI TÍNH</td>
            <td>LĨNH VỰC</td>
            <td className="text-center">SỐ ĐIỂM</td>
            <td className="text-center">TRẠNG THÁI</td>
          </tr>
        </thead>

        <tbody className="bg-white font-[400] ">
          {data.map((item) => (
            <tr
              key={item.id}
              className="cursor-pointer transition-transform  rounded-lg transform hover:bg-[#eaeaea6e] hover:text-[#403ECC] px-[20px] py-[10px]"
              onClick={(e) => openModal(e, item)}
            >
              <td className=" px-[20px] py-[10px] flex gap-[10px] items-center justify-start">
                <Image src={img} alt="" />
                <p>{item.name}</p>
              </td>
              <td>{item.dateOfBirh}</td>
              <td>{item.gender}</td>
              <td>{item.field}</td>
              <td className="text-center">{item.mark}</td>
              <td className="p-3">
                {item.status === 1 ? (
                  <p className="text-[#92929D] text-center rounded-[8px] bg-[#222222] p-2 bg-opacity-10">
                    Chưa xem
                  </p>
                ) : item.status === 2 ? (
                  <p className="text-[#30ab7e] text-center rounded-[8px] bg-[#eaf7f2] p-2">
                    Đã xem
                  </p>
                ) : item.status === 3 ? (
                  <p className="text-white text-center rounded-[8px] bg-[#50B5FF] p-2 ">
                    Tiếp nhận
                  </p>
                ) : (
                  <p className="text-[#eb4c4c] text-center rounded-[8px] bg-[#fdeded] p-2 ">
                    Loại bỏ
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 flex justify-end">
        <Pagination
          size="small"
          defaultCurrent={1}
          total={500}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </>
  );
};

export default DetailCV;
