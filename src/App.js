<<<<<<< HEAD
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import getWallpapers from './api/getWallpapers';
import ResultContainer from './component/ResultContainer';
import Hero from './component/Hero';
import Footer from './component/Footer';
import ToggleThemeButton from './component/ToggleThemeButton';
=======
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import getWallPapers from './api/getWallPapers';
>>>>>>> main
import './App.css';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

<<<<<<< HEAD
const defaultSearchOptions = {
    page: 1,
    order: 'popular',
    orientation: 'all',
    per_page: 20,
};

function App() {
    const savedUserTheme = localStorage.getItem('data-theme');
    const [theme, setTheme] = useState(
        savedUserTheme ? savedUserTheme : 'light'
    );
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [searchOptions, setSearchOptions] = useState(defaultSearchOptions);

    const updateQuery = (value) => {
        setQuery(value);
        setSearchOptions(defaultSearchOptions);
    };

    useEffect(() => {
        const fetch = async () => {
            const data = await getWallpapers({
                key: process.env.REACT_APP_PIXABAY,
                q: query,
                safesearch: true,
                ...searchOptions,
            });
            data && setData(data);
        };
        fetch();
    }, [query, searchOptions]);
=======
function App() {
    const [data, setData] = useState({});
    const [query, setQuery] = useState('');
    const [order, setOrder] = useState('popular');
    const [orientation, setOrientation] = useState('all');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);

    const numOfPages = data.totalHits ? Math.ceil(data.totalHits / perPage) : 0;

    useEffect(() => {
        const fetch = async () => {
            const data = await getWallPapers({
                q: query,
                orientation: orientation,
                order: order,
                page: page,
                per_page: perPage,
            });
            setData(data);
        };
        fetch();
    }, [query, orientation, order, page, perPage]);
>>>>>>> main

    return (
        <>
            <Container>
                <Hero
<<<<<<< HEAD
                    updateQuery={updateQuery}
                    searchOptions={searchOptions}
                    setSearchOptions={setSearchOptions}
                />
                <ResultContainer
                    data={data}
                    searchOptions={searchOptions}
                    setSearchOptions={setSearchOptions}
                />
                <Footer />
                <ToggleThemeButton theme={theme} setTheme={setTheme} />
=======
                    setQuery={setQuery}
                    setOrder={setOrder}
                    setOrientation={setOrientation}
                    setPerPage={setPerPage}
                />
                <ResultContainer
                    data={data}
                    page={page}
                    setPage={setPage}
                    numOfPages={numOfPages}
                />
                <Footer />
                <ToggleThemeButton />
>>>>>>> main
            </Container>
        </>
    );
}

export default App;
