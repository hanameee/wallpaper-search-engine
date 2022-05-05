import styled from 'styled-components';
import { useState } from 'react';
import { ImageCard, ImageModal } from '.';

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

const ImageContainer = ({ data, setIsLoading }) => {
    const [currentImageDetail, setCurrentImageDetail] = useState(null);
    const totalDataLength = data.hits?.length;
    return (
        <Container>
            {/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
            {currentImageDetail && (
                <ImageModal
                    currentImageDetail={currentImageDetail}
                    setCurrentImageDetail={setCurrentImageDetail}
                />
            )}
            <ResultsWrapper>
                {data.hits?.length > 0 &&
                    data.hits?.map((imgData, idx) => (
                        <ImageCard
                            key={imgData.id}
                            imgData={imgData}
                            onClick={() => setCurrentImageDetail(imgData)}
                            setIsLoading={setIsLoading}
                            isLastItem={totalDataLength - 1 === idx}
                        />
                    ))}
            </ResultsWrapper>
        </Container>
    );
};

export default ImageContainer;
