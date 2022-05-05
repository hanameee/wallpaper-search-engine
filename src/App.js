import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';

import Footer from './component/Footer';
import getWallPapers from './api/getWallPapers';
import './App.css';
import EmptyResult from './component/EmptyResult';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
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

    useEffect(() => {
        const fetch = async () => {
            const data = await getWallPapers({
                q: query,
                orientation: orientation,
                order: order,
                page: page,
                per_page: perPage,
            });

            setData((prevData) => ({
                ...prevData,
                hits: prevData.hits.concat(data.hits),
            }));
        };
        fetch();
    }, [query, orientation, order, page, perPage]);

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

    return (
        <>
            <Container>
                <Hero
                    setQuery={setQuery}
                    setOrder={setOrder}
                    setOrientation={setOrientation}
                    setPerPage={setPerPage}
                />
                <ResultContainer data={data} />
                <div ref={target}>
                    <EmptyResult isLoading={true} />
                </div>
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
