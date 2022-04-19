import styled from 'styled-components';
import { useState } from 'react';

import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import Pagination from './Pagination';
import EmptyResult from './EmptyResult';

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
const ResultContainer = ({ data, page, setPage, numOfPages }) => {
    const [currentImageDetail, setCurrentImageDetail] = useState(null);
=======
const ResultContainer = ({ data, setIsLoading }) => {
    const [currentImageDetail, setCurrentImageDetail] = useState(null);
    const totalDataLength = data.hits?.length;
>>>>>>> infinite-scroll
    return (
        <Container>
            {/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
            {currentImageDetail && (
                <ImageModal
                    currentImageDetail={currentImageDetail}
                    setCurrentImageDetail={setCurrentImageDetail}
                />
            )}
<<<<<<< HEAD
            {data.hits?.length > 0 && (
=======
            {/* {data.hits?.length > 0 && (
>>>>>>> infinite-scroll
                <Pagination
                    page={page}
                    setPage={setPage}
                    numOfPages={numOfPages}
                />
<<<<<<< HEAD
            )}
            <ResultsWrapper>
                {data.hits?.length > 0 ? (
                    data.hits?.map((imgData) => (
=======
            )} */}
            <ResultsWrapper>
                {data.hits?.length > 0 ? (
                    data.hits?.map((imgData, idx) => (
>>>>>>> infinite-scroll
                        <ImageCard
                            key={imgData.id}
                            imgData={imgData}
                            onClick={() => setCurrentImageDetail(imgData)}
<<<<<<< HEAD
=======
                            setIsLoading={setIsLoading}
                            isLastItem={totalDataLength - 1 === idx}
>>>>>>> infinite-scroll
                        />
                    ))
                ) : (
                    <EmptyResult isLoading={false} />
                )}
            </ResultsWrapper>
        </Container>
    );
};

export default ResultContainer;
