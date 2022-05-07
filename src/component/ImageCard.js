import styled from 'styled-components';

const Card = styled.div`
    margin-left: 8px;
    margin-bottom: 8px;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 300px;
    padding: 8px;
    cursor: pointer;
`;

const Img = styled.img`
    width: 100%;
    border-radius: 4px;
`;

const ImageCard = ({ imgData, onClick }) => {
    const { webformatURL, previewURL } = imgData;
    return (
        <Card onClick={onClick}>
            <Img width={150} height={100} src={webformatURL}></Img>
        </Card>
    );
};

export default ImageCard;
