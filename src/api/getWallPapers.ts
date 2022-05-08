import { IGetWallPapersResponse } from '../types';
import request from './request';
// https://pixabay.com/api/?key={ 개인 API Key }&q=yellow+flowers&image_type=photo

const BASE_URL = 'https://pixabay.com/api';

const defaultParam: Record<string, string> = {
    key: process.env.REACT_APP_PIXABAY!,
    safesearch: 'true',
};

const getWallPapers = async (paramObj: Record<string, string>) => {
    const params = new URLSearchParams({
        ...defaultParam,
        ...paramObj,
    }).toString();
    const result: IGetWallPapersResponse = await request(
        `${BASE_URL}/?${params}`
    );
    return result;
};

export default getWallPapers;
