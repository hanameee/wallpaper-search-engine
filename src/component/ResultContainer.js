import { useEffect, useState } from 'react';
import styled from 'styled-components';
import EmptyResult from './EmptyResult';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import Pagination from './Pagination';

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
            {currentImageDetail && (
                <ImageModal
                    currentImageDetail={currentImageDetail}
                    setCurrentImageDetail={setCurrentImageDetail}
                />
            )}
            {data.hits?.length > 0 && (
                <Pagination
                    total={data.totalHits}
                    per_page={per_page}
                    page={page}
                    setSearchOptions={setSearchOptions}
                />
            )}
            <ResultsWrapper>
                {data.hits?.length ? (
                    data.hits?.map((imgData) => (
                        <ImageCard
                            key={imgData.id}
                            imgData={imgData}
                            onClick={() => openImageDetail(imgData)}
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
