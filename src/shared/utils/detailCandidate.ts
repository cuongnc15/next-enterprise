// utils/api.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SEARCH_CANDIDATE;

export const detailCandidate = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/enterprise/DeatailCandidates`, {
      id,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
