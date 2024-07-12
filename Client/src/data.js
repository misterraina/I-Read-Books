import axios from 'axios';

const apiEndpoint = 'https://vercel-backend-testing.vercel.app/'; // Assuming your backend serves books from this endpoint

export async function fetchData() {
  try {
    const response = await axios.get(apiEndpoint);
    // console.log('Data fetched from API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error; // Rethrow the error so that the caller can handle it
  }
}

fetchData()