import styled from 'styled-components';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
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
    const [totalPages, setTotalPages] = useState(null);
    const isFetchingMoreImages = useRef(false);
    const isLastPage = useMemo(() => {
        return page === totalPages;
    }, [page, totalPages]);
    const target = useRef(null);

    useEffect(() => {
        setTotalPages((totalPages) =>
            totalPages ? data.totalHits : totalPages
        );
    }, [data]);

    const onIntersect = useCallback(
        async ([entries], observer) => {
            console.log(isFetchingMoreImages.current);
            if (isLastPage || isFetchingMoreImages.current) {
                return;
            }
            if (entries.isIntersecting) {
                isFetchingMoreImages.current = true;
                observer.unobserve(entries.target);
                console.log(page);
                const fetchData = async () => {
                    const fetchedData = await getWallPapers({
                        q: query,
                        orientation: orientation,
                        order: order,
                        page: page + 1,
                    });
                    setPage((page) => page + 1);
                    setData((prev) => ({
                        ...fetchedData,
                        hits: prev.hits.concat(fetchedData.hits),
                    }));
                    observer.observe(entries.target);
                    isFetchingMoreImages.current = false;
                };
                fetchData();
            }
        },
        [isFetchingMoreImages, isLastPage, order, orientation, page, query]
    );

    // intersection observer 생성 및 등록
    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, {});
        observer.observe(target.current);
        return () => observer.disconnect();
    }, [onIntersect, target]);

    // fetch initial data & fetch again when options change
    useEffect(() => {
        console.log('reset');
        setPage(1);
        const fetchData = async () => {
            isFetchingMoreImages.current = true;
            const fetchedData = await getWallPapers({
                q: query,
                orientation: orientation,
                order: order,
                page: 1,
            });
            isFetchingMoreImages.current = false;
            setData(fetchedData);
        };
        fetchData();
    }, [order, orientation, query]);

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
                    numOfPages={totalPages}
                />
                <div ref={target}>
                    {data.hits?.length > 0 && !isLastPage && (
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
