import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import getWallPapers from './api/getWallPapers';
import './App.css';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

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

    return (
        <>
            <Container>
                <Hero
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
            </Container>
        </>
    );
}

export default App;
