import DetailCV from '@/components/Modal/detailCV/detailCV';
import RemoveCV from '@/components/Modal/detailCV/removeCV';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { useEffect, useState } from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';
import Image from 'next/image';
import img from '../../../../../../../public/images/ImgPic.png';
import email from '../../../../../../../public/icons/Shape.png';

const DetailCanditade = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRemoveModalOpen, setisRemoveModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const openRemoveModal = () => setisRemoveModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const closeRemoveModal = () => setisRemoveModalOpen(false);

  const detailCandidateData = useSelector(
    (state: any) => state.detailCandidate.dataCandidate
  );
  const assessment_UserDtos = detailCandidateData.assessment_UserDtos;

  const viewCV = () => {
    router.push(`/admin/goi-ung-vien/ho-so-ung-vien/detail/${detailCandidateData.id}`);
  };

  return (
    <>
      <div>
        <p className="text-[#22216D]  text-[16px] p-4 font-[600]">
          Thông tin chi tiết ứng viên
        </p>

        <div className="flex p-3 gap-3">
          <div className="w-[70%] bg-white p-3">
            <div className="flex gap-3 items-center">
              <div className="h-[130px] w-[130px] flex items-center">
                <Image className="w-full" src={img} alt="" />
              </div>

              <div className="w-full">
                <div className="border border-b-2 border-[#E2E2EA] p-2">
                  <p className="text-[#22216D]  text-[32px]">
                    {assessment_UserDtos?.fullname} nguyen van a
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className=" w-[50%]">
                    <div className="flex gap-2 p-2">
                      <Image src={email} alt="" />
                      <p className="text-[#696974]">nguyenvana123@gmail.com</p>
                    </div>

                    <div className="flex gap-2 p-2">
                      <Image src={email} alt="" />
                      <p className="text-[#696974]">01/01/1998</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex gap-2 p-2">
                      <Image src={email} alt="" />
                      <p className="text-[#696974]">nguyenvana123@gmail.com</p>
                    </div>

                    <div className="flex gap-2 p-2">
                      <Image src={email} alt="" />
                      <p className="text-[#696974]"> {assessment_UserDtos?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[30%] flex flex-col gap-5">
            <div className="max-h-[311px] overflow-y-auto bg-white p-2 rounded-sm">
              <div className="p-2">
                <p className="text-[#22216D]">Vị trí mong muốn</p>
                <p>{assessment_UserDtos?.position_desire}</p>
              </div>

              <div className="p-2">
                <p className="text-[#22216D]">Mức lương mong muốn</p>
                <p>{assessment_UserDtos?.salary_desire}</p>
              </div>

              <div className="p-2">
                <p className="text-[#22216D]">Loại hình làm việc</p>
                <p>{assessment_UserDtos?.type_work}</p>
              </div>

              <div className="p-2">
                <p className="text-[#22216D]">Lời nhắn của ứng viên</p>
                <p>{assessment_UserDtos?.note}</p>
              </div>
            </div>

            <div className="max-h-[511px] overflow-y-auto bg-white p-2 rounded-sm flex-1">
              <div className="p-2">
                <p className="text-[#22216D]">Đánh giá phù hợp nghề</p>
                <li>Sale & Marketing: 90%</li>
                <li>Sale: 85%</li>
                <li>Content Marketing: 80%</li>
                <li>Digital Marketing: 80%</li>
                <li></li>
              </div>

              <div className="p-2">
                <p className="text-[#22216D]">Đánh giá năng lực</p>
                <li>Kỹ năng giao tiếp: 4/5</li>
                <li>Kỹ năng làm việc nhóm: 3/5</li>
                <li>Kỹ năng lãnh đạo: 3/5</li>
                <li>Kỹ năng thuyết trình: 2/5</li>
                <li></li>
              </div>

              <div className="p-2">
                <p className="text-[#22216D]">Đánh giá thấu hiểu bản thân</p>
                <li>Kỹ năng giao tiếp: 4/5</li>
                <li>Kỹ năng làm việc nhóm: 3/5</li>
                <li>Kỹ năng lãnh đạo: 3/5</li>
                <li>Kỹ năng thuyết trình: 2/5</li>
                <li></li>
              </div>

              <div className="flex justify-center cursor-pointer">
                <p className="text-[#22216D] p-3">Xác thực thông tin</p>
              </div>
            </div>
          </div>
        </div>

        <div onClick={viewCV} className="flex justify-between items-center p-3">
          <p className="text-[#22216D]  text-[16px] p-4 font-[600] cursor-pointer">
            Xem cv ứng viên đã tải lên
          </p>

          <div>
            <button
              onClick={openRemoveModal}
              className="text-white font-500 bg-[#EB4C4C] p-2 mr-3 rounded-[8px]"
            >
              Loại bỏ
            </button>

            <button onClick={openModal}>
              <p className="text-white font-500 p-2 bg-[#403ECC] rounded-[8px]">
                Tiếp nhận
              </p>
            </button>
          </div>
        </div>

        {isModalOpen && <DetailCV onClose={closeModal}></DetailCV>}
        {isRemoveModalOpen && <RemoveCV onClose={closeRemoveModal}></RemoveCV>}
      </div>
    </>
  );
};

export default DetailCanditade;
