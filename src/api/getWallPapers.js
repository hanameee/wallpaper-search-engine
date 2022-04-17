import request from './request';
// https://pixabay.com/api/?key={ 개인 API Key }&q=yellow+flowers&image_type=photo

const BASE_URL = 'https://pixabay.com/api';

const defaultParam = {
    key: process.env.REACT_APP_PIXABAY,
    safesearch: true,
    per_page: 10,
};

const getWallPapers = async (paramObj) => {
    const params = new URLSearchParams({
        ...defaultParam,
        ...paramObj,
    }).toString();
    const result = await request(`${BASE_URL}/?${params}`);
    return result;
};

export default getWallPapers;
