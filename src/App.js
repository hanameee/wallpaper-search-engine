import styled from 'styled-components';
import { useEffect, useState, useRef, useCallback } from 'react';
import {
    ToggleThemeButton,
    Search,
    Title,
    ImageContainer,
    Footer,
    EmptyResult,
} from './component';
import getWallPapers from './api/getWallPapers';
import './App.css';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

const Header = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    background-color: var(--secondary);
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 120px 32px 16px 32px;
`;

function App() {
    const [data, setData] = useState({ totalHits: 0, hits: [] });
    const [query, setQuery] = useState('');
    const [order, setOrder] = useState('popular');
    const [orientation, setOrientation] = useState('all');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const target = useRef(null);

    const numOfPages = data.totalHits ? Math.ceil(data.totalHits / perPage) : 0;

    const fetchWallPapers = useCallback(async () => {
        const data = await getWallPapers({
            q: query,
            orientation: orientation,
            order: order,
            page: page,
            per_page: perPage,
        });
        return data;
    }, [order, orientation, page, perPage, query]);

    useEffect(() => {
        const fetch = async () => {
            const fetchedWallPapers = await fetchWallPapers();
            if (page === 1) {
                setData(fetchedWallPapers);
            } else {
                setData((prevData) => ({
                    ...prevData,
                    hits: prevData.hits.concat(fetchedWallPapers.hits),
                }));
            }
        };
        fetch();
    }, [fetchWallPapers, page]);

    const onIntersect = ([entries]) => {
        if (entries.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, {
            threshold: 1,
        });
        observer.observe(target.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setPage(1);
    }, [order, orientation, perPage, query]);

    return (
        <Container>
            <Header>
                <Title />
                <Search
                    setQuery={setQuery}
                    setOrder={setOrder}
                    setOrientation={setOrientation}
                    setPerPage={setPerPage}
                />
            </Header>
            <ImageContainer data={data} />
            {numOfPages !== page && (
                <div ref={target}>
                    <EmptyResult isLoading={data.totalHits} />
                </div>
            )}
            <Footer />
            <ToggleThemeButton />
        </Container>
    );
}

export default App;
