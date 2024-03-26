import axios from 'axios';

const PDF = process.env.NEXT_PUBLIC_PDF;

const uploadPdf = async (pdfFile) => {
  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    const response = await axios.post(`${PDF}/api/upload/UploadFile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to upload PDF file');
  }
};

export default uploadPdf;
