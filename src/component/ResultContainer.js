<<<<<<< HEAD
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import EmptyResult from './EmptyResult';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import Pagination from './Pagination';
=======
import styled from 'styled-components';
import { useState } from 'react';

import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import Pagination from './Pagination';
import EmptyResult from './EmptyResult';
>>>>>>> main

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

<<<<<<< HEAD
const ResultContainer = ({ data, searchOptions, setSearchOptions }) => {
    const { page, per_page } = searchOptions;
    const [currentImageDetail, setCurrentImageDetail] = useState(null);

    const openImageDetail = (data) => {
        setCurrentImageDetail(data);
    };

    useEffect(() => {
        setSearchOptions((prev) => {
            return {
                ...prev,
                page: page,
                per_page: per_page,
            };
        });
    }, [per_page, page, setSearchOptions]);

    return (
        <Container>
=======
const ResultContainer = ({ data, page, setPage, numOfPages }) => {
    const [currentImageDetail, setCurrentImageDetail] = useState(null);
    return (
        <Container>
            {/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
>>>>>>> main
            {currentImageDetail && (
                <ImageModal
                    currentImageDetail={currentImageDetail}
                    setCurrentImageDetail={setCurrentImageDetail}
                />
            )}
            {data.hits?.length > 0 && (
                <Pagination
<<<<<<< HEAD
                    total={data.totalHits}
                    per_page={per_page}
                    page={page}
                    setSearchOptions={setSearchOptions}
                />
            )}
            <ResultsWrapper>
                {data.hits?.length ? (
=======
                    page={page}
                    setPage={setPage}
                    numOfPages={numOfPages}
                />
            )}
            <ResultsWrapper>
                {data.hits?.length > 0 ? (
>>>>>>> main
                    data.hits?.map((imgData) => (
                        <ImageCard
                            key={imgData.id}
                            imgData={imgData}
<<<<<<< HEAD
                            onClick={() => openImageDetail(imgData)}
=======
                            onClick={() => setCurrentImageDetail(imgData)}
>>>>>>> main
                        />
                    ))
                ) : (
                    <EmptyResult />
                )}
            </ResultsWrapper>
        </Container>
    );
};

export default ResultContainer;
