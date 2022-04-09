import { useEffect, useState } from 'react';
import styled from 'styled-components';
import getWallpapers from './api/getWallpapers';
import ResultContainer from './component/ResultContainer';
import Hero from './component/Hero';
import Footer from './component/Footer';
import ToggleThemeButton from './component/ToggleThemeButton';
import './App.css';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
`;

const defaultSearchOptions = {
    page: 1,
    order: 'popular',
    orientation: 'all',
    per_page: 20,
};

function App() {
    const [theme, setTheme] = useState('light');
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

    return (
        <>
            <Container>
                <Hero
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
            </Container>
        </>
    );
}

export default App;
