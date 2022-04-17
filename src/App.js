import styled from 'styled-components';
import { useEffect, useState, useRef, useCallback } from 'react';
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

const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: bold;
    font-size: 40px;
    margin: 16px 0;
`;

const PER_PAGE = 10;

function App() {
    const [data, setData] = useState({});
    const [query, setQuery] = useState('');
    const [order, setOrder] = useState('popular');
    const [orientation, setOrientation] = useState('all');
    const [page, setPage] = useState(1);
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

    const onIntersect = useCallback(
        async ([entries], observer) => {
            if (page === numOfPages) {
                return;
            }
            if (data.hits?.length > 0 && entries.isIntersecting) {
                observer.unobserve(entries.target);
                setPage((prev) => prev + 1);
            }
        },
        [data]
    );

    // intersection observer 생성 및 등록
    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, {});
        observer.observe(target.current);
        return () => observer.disconnect();
    }, [onIntersect, target]);

    // fetch initial data & fetch again when options change
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
        fetchData();
    }, [page]);

    // 추가 fetch -> useEffect 면 무조건 1번

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
                />
                <div ref={target}>
                    {data.hits?.length > 0 && page !== numOfPages && (
                        <Loader>로딩중...</Loader>
                    )}
                </div>
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
