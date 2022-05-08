let debounceTimer;

const debounce = (callback, time, e) => {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
        callback(e);
    }, time);
};

export default debounce;
