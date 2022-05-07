import styled from 'styled-components';
import React, { useState, Suspense } from 'react';
import ImageCard from './ImageCard';
const ImageModal = React.lazy(() => import('./ImageModal'));

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

const ResultContainer = ({ data }) => {
    const [currentImageDetail, setCurrentImageDetail] = useState(null);

    return (
        <Container>
            {/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
            <Suspense fallback={<h1>로딩중</h1>}>
                {currentImageDetail && (
                    <ImageModal
                        currentImageDetail={currentImageDetail}
                        setCurrentImageDetail={setCurrentImageDetail}
                    />
                )}
            </Suspense>
            <ResultsWrapper>
                {data.hits?.map((imgData, idx) => (
                    <ImageCard
                        key={`${imgData.id}${idx}`}
                        imgData={imgData}
                        onClick={() => setCurrentImageDetail(imgData)}
                    />
                ))}
            </ResultsWrapper>
        </Container>
    );
};

export default ResultContainer;
