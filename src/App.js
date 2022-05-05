import styled from 'styled-components';
import { useEffect, useState, useRef, useCallback, useReducer } from 'react';
import {
    ToggleThemeButton,
    Search,
    Title,
    ImageContainer,
    Footer,
    EmptyResult,
} from './component';
import getWallPapers from './api';
import config from './config';
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
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const target = useRef(null);

    const numOfPages = data.totalHits
        ? Math.ceil(data.totalHits / config.WALLPAPERS_PER_PAGE)
        : 0;

    const initialOptions = {
        query: '',
        order: 'popular',
        orientation: 'all',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'setQuery':
                return { ...state, query: action.payload };
            case 'setOrder':
                return { ...state, order: action.payload };
            case 'setOrientation':
                return { ...state, orientation: action.payload };
            default:
                return state;
        }
    };

    const [options, dispatch] = useReducer(reducer, initialOptions);

    const onIntersect = useCallback(
        async ([entries], observer) => {
            if (!isLoading) {
                if (data.hits?.length > 0 && entries.isIntersecting) {
                    observer.unobserve(entries.target);
                    setPage((prev) => prev + 1);
                }
            }
        },
        [data, isLoading]
    );

    const fetchWallPapers = useCallback(async () => {
        const fetchedData = await getWallPapers({
            ...options,
            page: page,
        });
        return fetchedData;
    }, [options, page]);

    useEffect(() => {
        const updateWallPapers = async () => {
            const fetchedData = await fetchWallPapers();
            if (page === 1) {
                setData(fetchedData);
            } else {
                setData((prev) => ({
                    ...fetchedData,
                    hits: prev.hits.concat(fetchedData.hits),
                }));
            }
        };
        setIsLoading(true);
        updateWallPapers();
    }, [fetchWallPapers, page]);

    useEffect(() => {
        if (!target.current) return;
        const observer = new IntersectionObserver(onIntersect, {
            threshold: 0.5,
        });
        observer.observe(target.current);
        return () => observer.disconnect();
    }, [onIntersect]);

    useEffect(() => {
        setPage(1);
    }, [options]);

    return (
        <Container>
            <Header>
                <Title />
                <Search dispatch={dispatch} />
            </Header>
            <ImageContainer data={data} setIsLoading={setIsLoading} />
            {page !== numOfPages && (
                <div ref={target}>
                    {isLoading && <EmptyResult isLoading={data.hits?.length} />}
                </div>
            )}
            <Footer />
            <ToggleThemeButton />
        </Container>
    );
}

export default App;
