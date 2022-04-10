const generateQueryString = (obj) => {
    const searchParams = new URLSearchParams(obj);
    return searchParams.toString();
};

export default generateQueryString;
