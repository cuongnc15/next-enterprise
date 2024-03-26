import styles from './detailModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '@/store/modules/count/slice';

const DetailCV = ({ onClose }) => {
  const count = useSelector((state: any) => state.count.value);
  const dispatch = useDispatch();

  const handleCloseAndIncrement = () => {
    onClose();
    dispatch(increment());
  };

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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <div className="flex justify-center p-3 font-600">
            <p>
              Bạn có chắc chắn muốn <span className="text-[#403ECC]  ">‘Tiếp nhận’</span>{' '}
              hồ sơ ứng viên này không?
            </p>
          </div>

          <div className="border-[2px] border-solid border-[#E2E2EA] w-full mb-3"></div>

          <div className="flex justify-between p-3">
            <div className="text-[#403ECC]">
              <p>Số lượt tiếp nhận: {count}</p>
              <p>Tổng số hồ sơ có thể tiếp nhân: 10</p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="text-white w-[89px] font-500 bg-[#EB4C4C] p-2 mr-3 rounded-[8px]"
              >
                Hủy
              </button>

              <button
                onClick={handleCloseAndIncrement}
                disabled={count === 10}
                className={`rounded-[8px]  w-[89px] text-white font-500 p-2 ${
                  count === 10 ? 'bg-gray-400' : 'bg-[#403ECC]'
                } `}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCV;
