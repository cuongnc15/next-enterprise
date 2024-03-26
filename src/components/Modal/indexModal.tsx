import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './indexModal.module.scss';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { incrementView } from '@/store/modules/viewCount/slice';

import { getDetailCandidate } from '@/store/modules/detailCandidate/slice';
import { detailCandidate } from '@/shared/utils/detailCandidate';

const Modal = ({ onClose, IDApi }) => {
  const router = useRouter();
  const [edus, setEdus] = useState([]);
  const [exps, setExps] = useState([]);

  const Dispatch = useDispatch();
  const viewCount = useSelector((state: any) => state.viewCount.value);
  const viewRest = 30 - viewCount;
  const viewDetail = () => {
    router.push(`/admin/goi-ung-vien/ho-so-ung-vien/detail/${detailCandidateData.id}`);
    Dispatch(incrementView());
  };
  const detailCandidateData = useSelector(
    (state: any) => state.detailCandidate.dataCandidate
  );
  const addressFix = detailCandidateData?.address?.split('#').slice(-2).join(', ');

  useEffect(() => {
    (async () => {
      try {
        const data = await detailCandidate(IDApi);
        Dispatch(getDetailCandidate(data));
        setEdus(data.cv_EduDTOs);
        setExps(data.cv_ExpDTOs);

        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    })();
  }, [Dispatch]);

  return (
    <>
      <div className={styles.modal}>
        <div className="p-[20px] w-[50%] h-[full] overflow-visible rounded-[16px] bg-white fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <button
            onClick={onClose}
            className="absolute cursor-pointer transition-transform transform hover:scale-105 z-1000000000000000000000000 text-white bg-[#44444F] border-solid border-[6px] border-white top-0 right-0 p-4 -translate-y-[10px] translate-x-[20px] rounded-full"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <p className="text-[#22216D] text-[16px] font-[400] leading[23px]  ">
            {detailCandidateData.fullname}
          </p>

          <p className="mb-[20px]">{addressFix}</p>

          <div className="max-h-[140px] mb-2 overflow-y-auto custom_scrollbar">
            <table className="w-full h-full border-collapse mb-[20px]">
              <thead className="text-[#B5B5BE] sticky bg-white top-0 z-10">
                <tr>
                  <td className="p-[10px] w-2/5 border-solid border-[1px] border-[#F1F1F5]">
                    Trường
                  </td>
                  <td className="p-[10px] w-1/5 border-solid border-[1px] border-[#F1F1F5]">
                    Ngành học
                  </td>
                  <td className="p-[10px] w-1/5 border-solid border-[1px] border-[#F1F1F5]">
                    Ngày bắt đầu
                  </td>
                  <td className="p-[10px] w-1/5 border-solid border-[1px] border-[#F1F1F5]">
                    Ngày kết thúc
                  </td>
                </tr>
              </thead>

              <tbody className="text-[#44444F] max-h-[100px] overflow-y-auto">
                {edus?.map((edu, index) => (
                  <tr key={index}>
                    <td className="p-[10px] w-2/5 overflow-x-auto border-solid border-[1px] border-[#F1F1F5]">
                      {edu.school}
                    </td>
                    <td className="p-[10px] border-solid border-[1px] border-[#F1F1F5]">
                      {edu.major}
                    </td>
                    <td className="p-[10px] border-solid border-[1px] border-[#F1F1F5]">
                      {edu.period.split('#')[0]}
                    </td>
                    <td className="p-[10px] border-solid border-[1px] border-[#F1F1F5]">
                      {edu.period.split('#')[1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="max-h-[140px] overflow-y-auto custom_scrollbar">
            <table className="w-full h-full border-collapse mb-[20px]">
              <thead className="text-[#B5B5BE] sticky top-0 z-10 bg-white">
                <tr className="">
                  <td className="p-[10px] w-2/5 whitespace-nowrap overflow-x-auto border-solid border-[1px] border-[#F1F1F5]">
                    Tên công ty
                  </td>
                  <td className="p-[10px] w-1/5 border-solid border-[1px] border-[#F1F1F5]">
                    Chức vụ
                  </td>
                  <td className="p-[10px] w-1/5 border-solid border-[1px] border-[#F1F1F5]">
                    Ngày bắt đầu
                  </td>
                  <td className="p-[10px] w-1/5 border-solid border-[1px] border-[#F1F1F5]">
                    Ngày kết thúc
                  </td>
                </tr>
              </thead>

              <tbody className="text-[#44444F] max-h-[100px] overflow-y-auto">
                {exps?.map((exp, index) => (
                  <tr key={index}>
                    <td className="p-[10px] whitespace-nowrap w-2/5 border-solid border-[1px] border-[#F1F1F5]">
                      {exp.company}
                    </td>
                    <td className="p-[10px] border-solid border-[1px] border-[#F1F1F5]">
                      {exp.position}
                    </td>
                    <td className="p-[10px] border-solid border-[1px] border-[#F1F1F5]">
                      {exp.period.split('#')[0]}
                    </td>
                    <td className="p-[10px] border-solid border-[1px] border-[#F1F1F5]">
                      {exp.period.split('#')[1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#22216D] p-2 font-500">
                Số lượt xem còn lại: {viewRest}
              </p>
              <p className="text-[#22216D] p-2 font-500">Tổng số lượt xem: 30</p>
            </div>

            <div>
              <button
                onClick={onClose}
                className="text-white font-500 bg-[#EB4C4C] p-2 mr-3 rounded-[8px]"
              >
                Hủy bỏ
              </button>

              <button
                className="rounded-[8px] text-white font-500 p-2 bg-[#403ECC]"
                onClick={viewDetail}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
