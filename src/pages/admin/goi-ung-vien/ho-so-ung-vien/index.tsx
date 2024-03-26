import { NextPage } from 'next';
import { Form, Input, PaginationProps, Select, Spin } from 'antd';
import Modal from '../../../../components/Modal/indexModal';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { searchCandidate } from '@/shared/utils/searchCandidate';
import styles from './index.module.scss';
import { getField } from '@/store/modules/field/slice';

const CV: NextPage = () => {
  const Dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [trClick, setTrClick] = useState(null);
  const openModal = (e: any, IDApi: any) => {
    e.target.offsetParent.classList.add('bg-[#eaeaead1]');
    setTrClick(e.target.offsetParent);
    setModalOpen(true);
    setIDApi(IDApi);
  };
  const closeModal = () => {
    trClick.classList.remove('bg-[#eaeaead1]');
    setTrClick(null);
    setModalOpen(false);
  };
  const onShowPageChange: PaginationProps['onChange'] = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const genderOption = [
    { value: '0', label: 'Nam' },
    { value: '1', label: 'Nữ' },
    { value: '2', label: 'Khác' },
  ];
  const fieldOption = [
    { value: null, label: 'All' },
    { value: '46', label: 'Sale & Marketing' },
    { value: '47', label: 'Công nghệ thông tin' },
    { value: '48', label: 'Tài chính - Kế toán' },
    { value: '50', label: 'Vận hành' },
  ];
  const statusOption = [
    { value: '1', label: 'Chưa xem' },
    { value: '2', label: 'Đã xem' },
    { value: '3', label: 'Tiếp nhận' },
    { value: '4', label: 'Loại bỏ' },
  ];

  const [dataList, setDataList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(100);
  const [type, setType] = useState(null);
  const [gender, setGender] = useState(null);
  const [nameValue, setNameValue] = useState(null);
  const [pointValue, setPointValue] = useState(null);
  const [statusValue, setStatusValue] = useState(null);

  const rq = {
    enterprise_id: null,
    points: pointValue,
    type: type,
    name: nameValue,
    gender: gender,
    status: statusValue,
    assessment_id: null,
    page: page,
    pageSize: pageSize,
  };
  const [IDApi, setIDApi] = useState('');

  const getListData = async (rq: any) => {
    setLoading(true);
    try {
      const data = await searchCandidate(rq);
      setDataList(data.data);
      Dispatch(getField(data.data));
      console.log(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Ẩn loading sau khi dữ liệu đã được tải
    }
  };
  useEffect(() => {
    getListData(rq);
  }, [page, pageSize]);

  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    getListData(rq);
  };

  const handleCancel = () => {
    setPointValue(null);
    setNameValue(null);
    setGender(null);
    setStatusValue(null);
    getListData({
      ...rq,
      gender: null,
      name: null,
      points: null,
      status: null,
    });
  };
  return (
    <>
      {loading && (
        <Spin
          size="large"
          tip="Loading..."
          className="fixed z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        />
      )}
      <div className="flex mb-2 items-center gap-2 pb-[10px]">
        <a className="text-[#696974] font-medium leading-[23px] ">Trang chủ</a>
        <FontAwesomeIcon className="text-[#696974] h-[10px]" icon={faAnglesRight} />
        <a className="text-[#000000] font-medium leading-[23px] ">Hồ sơ ứng viên</a>
      </div>
      <div className="bg-white p-[15px]">
        <div className="flex gap-2 auto-rows-fr justify-between">
          <Input
            className="rounded-[10px] h-[41px] lg:w-[20%]"
            type="text"
            placeholder="Tên ứng viên"
            allowClear
            value={nameValue}
            onChange={(e) =>
              e.target.value.trim() === ''
                ? setNameValue(null)
                : setNameValue(e.target.value)
            }
          />

          <Select
            onChange={(value) => setGender(parseInt(value))}
            value={
              genderOption.find((e) => {
                return +e.value === gender;
              })?.label || null
            }
            className="lg:w-[20%] h-[41px]"
            options={genderOption}
            placeholder="Giới tính"
            allowClear
            onClear={() => setGender(null)}
            id=""
          ></Select>

          <Input
            className="rounded-[10px] h-[41px] lg:w-[20%]"
            type="text"
            placeholder="Số điểm"
            value={pointValue}
            allowClear
            onChange={(e) => {
              e.target.value.trim() === ''
                ? setPointValue(null)
                : setPointValue(e.target.value);
            }}
          />

          <Select
            allowClear
            value={
              statusOption.find((e) => {
                return +e.value === statusValue;
              })?.label || null
            }
            className="lg:w-[20%] h-[41px] "
            options={statusOption}
            placeholder="Trạng thái"
            onChange={(value) => setStatusValue(parseInt(value))}
            onClear={() => setStatusValue(null)}
            id=""
          ></Select>

          <button
            onClick={handleCancel}
            className="bg-[#EB4C4C] h-[41px] text-white lg:w-[150px] p-[10px] rounded-[10px] text-center"
          >
            Hủy bỏ
          </button>

          <button
            onClick={handleSearch}
            className="bg-[#403ECC] h-[41px] text-white lg:w-[150px] p-[10px] rounded-[10px] text-center"
          >
            Tìm kiếm
          </button>
        </div>

        <div className="flex justify-between items-center p-3">
          <p className="text-[#22216D]  text-[34px] p-4 font-[600]">Danh sách ứng viên</p>
          <div>
            Sort by:
            <Select
              popupClassName="!w-[200px]"
              placement="bottomRight"
              className="ml-3"
              size="large"
              onChange={(value) => {
                setType(parseInt(value));
                getListData({ ...rq, type: parseInt(value) });
              }}
              defaultValue={null}
              options={fieldOption}
              id=""
            ></Select>
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh_-_320px)] custom_scrollbar overflow-y-auto">
        <table className="w-full ">
          <thead className="bg-[#F1F1F5] px-[20px] py-[10px] sticky top-0 z-10 text-[#92929D] font-[500] text-[16px]">
            <tr>
              <td className="py-[20px] ps-[20px]">TÊN ỨNG VIÊN</td>
              <td className="text-center">NGÀY SINH</td>
              <td className="text-center">GIỚI TÍNH</td>
              <td className="text-center">LĨNH VỰC</td>
              <td className="text-center">SỐ ĐIỂM (%)</td>
              <td className="text-center">TRẠNG THÁI</td>
            </tr>
          </thead>

          <tbody className="bg-white h-full font-[400]">
            {dataList.map((item) => (
              <tr
                key={item.id_assessment_user}
                className="relative text-[#696974] text-[16px] font-normal w-full cursor-pointer transition-transform rounded-lg transform hover:bg-[#eaeaea6e] hover:text-[#403ECC] "
                onClick={(e) => openModal(e, item.id_assessment_user)}
              >
                <td className="ps-[20px] absolute top-[50%] -translate-y-1/2 flex gap-2 items-center">
                  <img
                    className="rounded-[50%]"
                    src={item.avatar}
                    alt="avatar"
                    width={30}
                    height={30}
                  />

                  <p className="">{item.name}</p>
                </td>
                <td className="text-center">{item.year_of_birth}</td>
                <td className="text-center">
                  {item.gender === 0 ? 'Nam' : item.gender === 1 ? 'Nữ' : 'Khác'}
                </td>
                <td className="text-center">{item.field}</td>
                <td className="text-center">{item.assessment_Test_Results.result}</td>
                <td className="p-3">
                  {item.status === 0 ? (
                    <p className="text-[#92929D] text-center rounded-[8px] bg-[#222222] p-2 bg-opacity-10">
                      Chưa xem
                    </p>
                  ) : item.status === 1 ? (
                    <p className="text-[#30ab7e] text-center rounded-[8px] bg-[#eaf7f2] p-2">
                      Đã xem
                    </p>
                  ) : item.status === 2 ? (
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
      </div>

      <div className="mt-3 overflow-visible text-[#44444F] font-normal flex justify-between items-center px-[30px]">
        <p>
          {page === 1
            ? `1-${pageSize}/100`
            : page === total / pageSize
            ? `${total - pageSize + 1}/100`
            : `${page}1-${page * pageSize}/100`}{' '}
        </p>
        <Pagination
          size="small"
          pageSize={pageSize}
          defaultCurrent={1}
          total={total}
          onChange={onShowPageChange}
        />
      </div>
      {isModalOpen && <Modal onClose={closeModal} IDApi={IDApi}></Modal>}
    </>
  );
};

export default CV;
