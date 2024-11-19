import axios from 'axios';
const getAccessToken = () => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    .split('=')[1];
};
const logoutUser = () => {
  document.cookie = 'token=; max-age=0';
  window.location.href = '/login';
};
const protectedApi = async (url, options = {}) => {
  let token = getAccessToken();
  try {
    const response = await axios({
      url,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      logoutUser();
    }
    throw error;
  }
};
export { makeApiCall };
