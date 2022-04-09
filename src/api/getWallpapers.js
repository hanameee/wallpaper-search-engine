import request from '.';
import generateQueryString from '../utils/generateQueryString';

const BASE_URL = 'https://pixabay.com/api';

const getWallpapers = async (param) => {
    const qs = generateQueryString(param);
    const result = await request(`${BASE_URL}/?${qs}`);
    return result;
};

export default getWallpapers;
