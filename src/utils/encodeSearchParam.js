const encodeSearchParam = (obj) => {
    return Object.entries(obj)
        .map(([k, v]) => (v ? `?${k}=${v}` : ''))
        .join('');
};

export default encodeSearchParam;
