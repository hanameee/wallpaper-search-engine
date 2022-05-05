import styled from 'styled-components';

const Card = styled.div`
    margin-left: 8px;
    margin-bottom: 8px;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 300px;
    padding: 8px;
    cursor: pointer;
    min-height: 100px;
`;

const Img = styled.img`
    width: 100%;
    border-radius: 4px;
    background-color: blue;
`;

const ImageCard = ({ imgData, onClick, setIsLoading, isLastItem }) => {
    const { webformatURL, id, previewURL } = imgData;
    return (
        <Card onClick={onClick}>
            <Img
                // width={150}
                // height={150}
                key={id}
                src={webformatURL}
                onLoad={isLastItem ? () => setIsLoading(false) : null}
            ></Img>
        </Card>
    );
};

export default ImageCard;
