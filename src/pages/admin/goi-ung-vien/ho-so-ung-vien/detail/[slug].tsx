import DetailCV from '@/components/Modal/detailCV/detailCV';
import RemoveCV from '@/components/Modal/detailCV/removeCV';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { useEffect, useState } from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';
import Image from 'next/image';
import img from '../../../../../../public/images/side-image-login.png';
import { getHistoryTest } from '@/shared/utils/testHistory';
import styles from './style.module.scss';
import { Spin } from 'antd';

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

  const cv_path = assessment_UserDtos.cv_path;

  const addressFull = detailCandidateData?.address?.split('#').join(', ');
  const viewCV = () => {
    router.push(
      `/admin/goi-ung-vien/ho-so-ung-vien/detail/xem-CV/${detailCandidateData.id}`
    );
  };

  const [dataTest, setDataTest] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Bắt đầu hiển thị loading
    (async () => {
      try {
        const dataTestApi = await getHistoryTest(assessment_UserDtos.id);
        console.log(dataTestApi);
        setDataTest(dataTestApi);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Ẩn loading sau khi dữ liệu đã được tải
      }
    })();
  }, [assessment_UserDtos.id]);

  const field = useSelector((state: any) => state.field.fieldData);

  const filteredField = field.filter(
    (item: any) => item.id_assessment_user === assessment_UserDtos.id
  );

  const fieldCareer = dataTest[1]?.asessment_Result.filter(
    (item) => item.field === filteredField[0].field
  );

  console.log(filteredField[0].field);
  console.log(dataTest[1]?.asessment_Result);

  return (
    <>
      <div>
        <p className="text-[#22216D] text-[16px] pb-[10px] px-4 font-[600]">
          Thông tin chi tiết ứng viên
        </p>
        <div className="flex p-3 gap-3">
          <div className="w-[70%] bg-white rounded-[8px] pdf-container max-h-[842px] h-full overflow-y-auto ">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              {cv_path && <Viewer fileUrl={assessment_UserDtos.cv_path} />}
            </Worker>
          </div>

          <div className="w-[30%] h-full flex flex-col gap-5">
            <div className="max-h-[311px] overflow-y-auto bg-white p-2 rounded-sm">
              <p className="text-[#EB4C4C] text-[18px] font-bold leading-[26px] p-2">
                Thông tin ứng viên
              </p>

              <div className="p-2">
                <p className="text-[#22216D] text-[16px] font-medium leading-[23px]">
                  Địa chỉ
                </p>
                <p className="text-[#44444F] text-base">{addressFull}</p>
              </div>

              <div className="p-2">
                <p className="text-[#22216D] text-[16px] font-medium leading-[23px]">
                  Vị trí mong muốn
                </p>
                <p className="text-[#44444F] text-base">
                  {assessment_UserDtos?.position_desire}
                </p>
              </div>

              <div className="p-2">
                <p className="text-[#22216D] text-[16px] font-medium leading-[23px]">
                  Mức lương mong muốn
                </p>
                <p className="text-[#44444F] text-base">
                  {assessment_UserDtos?.salary_desire}
                </p>
              </div>

              <div className="p-2">
                <p className="text-[#22216D] text-[16px] font-medium leading-[23px]">
                  Loại hình làm việc
                </p>
                <p className="text-[#44444F] text-base">
                  {assessment_UserDtos?.type_work}
                </p>
              </div>

              <div className="p-2">
                <p className="text-[#22216D] text-[16px] font-medium leading-[23px]">
                  Lời nhắn của ứng viên
                </p>
                <p className="text-[#44444F] text-base">{assessment_UserDtos?.note}</p>
              </div>
            </div>

            <div className="max-h-[511px] overflow-y-auto bg-white p-2 rounded-sm flex-1">
              <p className="text-[#EB4C4C] text-[18px] font-bold leading-[26px] p-2">
                Kết quả bài test
              </p>

              <div className="p-2">
                <p className="text-[#22216D] text-[16px] font-medium leading-[23px]">
                  Đánh giá phù hợp nghề
                </p>

                {fieldCareer?.map((item, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Image
                      className="w-[80px] shadow-md h-[80px] rounded-[10px] m-2"
                      src={item.assessments?.avatar}
                      alt="avatar"
                      width={80}
                      height={80}
                    />
                    <div className="text-[16px] font-medium">
                      <p>{item.assessments?.name}</p>
                      <p className="text-[#EB4C4C] py-1">
                        {item.assessment_Test_Results.result} %
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2">
                <p className="text-[#22216D] text-[16px] font-medium leading-[23px]">
                  Đánh giá thấu hiểu bản thân
                </p>
                {dataTest[0]?.asessment_Result?.slice(0, 5).map((data, index) => (
                  <div key={index} className="flex gap-2">
                    <Image
                      className="w-[80px] shadow-md h-[80px] rounded-[10px] m-2"
                      src={data.assessments?.avatar}
                      alt="avatar"
                      width={80}
                      height={80}
                    />
                    <div className="text-[16px] font-medium">
                      <p className="font-semibold py-2">{data.assessments?.name}</p>
                      <p className=" py-1">
                        {JSON.parse(data.assessment_Test_Results.result).map(
                          (item, i) => (
                            <li key={i} className="flex gap-2 py-1 justify-between">
                              <p className="text-[#44444F] text-base">{item.name}</p>
                              <p className="text-[#EB4C4C] w-[20%] text-right">
                                {item.point}
                              </p>
                            </li>
                          )
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2">
                <p className="text-[#22216D] text-[16px] font-medium leading-[23px]">
                  Đánh giá năng lực
                </p>
                {dataTest[2]?.asessment_Result?.slice(0, 5).map((data, index) => (
                  <div key={index} className="flex gap-2">
                    <Image
                      className="w-[80px] shadow-md h-[80px] rounded-[10px] m-2"
                      src={data.assessments?.avatar}
                      alt="avatar"
                      width={80}
                      height={80}
                    />
                    <div className="text-[16px] font-medium">
                      <p className="font-semibold py-2">{data.assessments?.name}</p>
                      <p className=" py-1">
                        {JSON.parse(data.assessment_Test_Results.result).data.map(
                          (item, i) => (
                            <li key={i} className="flex gap-2 py-1 justify-between">
                              <p className="text-[#44444F] text-base">{item.name}</p>
                              <p className="text-[#EB4C4C] w-[20%] text-right">
                                {item.level}
                              </p>
                            </li>
                          ),
                          console.log(JSON.parse(data.assessment_Test_Results.result))
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center py-4">
                <a
                  href={detailCandidateData?.linkToHistory}
                  className="text-white focus:none bg-[#403ECC] px-[30px] py-[10px] rounded-[10px] text-[20px] font-semibold leading-[23px]"
                  target="_blank"
                  rel="noreferrer"
                >
                  Xác thực thông tin
                </a>
              </div>
            </div>
          </div>
        </div>

        <div onClick={viewCV} className="flex justify-between items-center p-3">
          <p className="text-[#22216D]  text-[16px] p-4 font-[600] cursor-pointer">
            Xem cv ứng viên đã tạo
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
