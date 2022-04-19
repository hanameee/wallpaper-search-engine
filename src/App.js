import styled from 'styled-components';
import { useEffect, useState, useRef, useCallback } from 'react';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import EmptyResult from './component/EmptyResult';
import getWallPapers from './api/getWallPapers';
import './App.css';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

const PER_PAGE = 20;

function App() {
    const [data, setData] = useState({});
    const [query, setQuery] = useState('');
    const [order, setOrder] = useState('popular');
    const [orientation, setOrientation] = useState('all');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const target = useRef(null);

    const numOfPages = data.totalHits
        ? Math.ceil(data.totalHits / PER_PAGE)
        : 0;

    const fetch = useCallback(async () => {
        const fetchedData = await getWallPapers({
            q: query,
            orientation: orientation,
            order: order,
            page: page,
        });
        return fetchedData;
    }, [order, orientation, page, query]);

    useEffect(() => {
        setPage(1);
    }, [order, orientation, query]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await fetch();
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
        fetchData();
    }, [fetch, page]);

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

    useEffect(() => {
        if (page === numOfPages) {
            return;
        }
        const observer = new IntersectionObserver(onIntersect, {
            threshold: 0.5,
        });
        observer.observe(target.current);
        return () => observer.disconnect();
    }, [isLoading, numOfPages, onIntersect, page]);

    return (
        <>
            <Container>
                <Hero
                    setQuery={setQuery}
                    setOrder={setOrder}
                    setOrientation={setOrientation}
                />
                <ResultContainer
                    data={data}
                    page={page}
                    setPage={setPage}
                    numOfPages={numOfPages}
                    setIsLoading={setIsLoading}
                />
                <div ref={target}>
                    {data.hits?.length && page !== numOfPages && isLoading && (
                        <EmptyResult isLoading={true} />
                    )}
                </div>
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
