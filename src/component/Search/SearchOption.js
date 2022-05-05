import styled from 'styled-components';

const SearchOptionContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`;

const SearchOptionUl = styled.ul`
    padding: 0;
`;

const SearchOptionLi = styled.li`
    list-style: none;
    margin: 16px 0;
`;

const SearchOptionLabel = styled.p`
    border: 1px solid #4cabff;
    color: #4cabff;
    padding: 4px;
    border-radius: 16px;
`;

const SearchOption = ({ dispatch }) => {
    return (
        <SearchOptionContainer>
            <SearchOptionUl>
                <SearchOptionLi>
                    <SearchOptionLabel>정렬</SearchOptionLabel>
                    <form
                        id="order"
                        onChange={(e) =>
                            dispatch({
                                type: 'setOrder',
                                payload: e.target.value,
                            })
                        }
                    >
                        <input
                            type="radio"
                            name="order"
                            id="latest"
                            value="latest"
                        />
                        <label htmlFor="latest">최신순</label>
                        <input
                            type="radio"
                            name="order"
                            id="popular"
                            value="popular"
                            defaultChecked={true}
                        />
                        <label htmlFor="popular">인기순</label>
                    </form>
                </SearchOptionLi>
                <SearchOptionLi>
                    <SearchOptionLabel>사진 방향</SearchOptionLabel>
                    <form
                        id="orientation"
                        onChange={(e) =>
                            dispatch({
                                type: 'setOrientation',
                                payload: e.target.value,
                            })
                        }
                    >
                        <input
                            type="radio"
                            name="orientation"
                            id="all"
                            value="all"
                            defaultChecked={true}
                        />
                        <label htmlFor="all">모두</label>
                        <input
                            type="radio"
                            name="orientation"
                            id="horizontal"
                            value="horizontal"
                        />
                        <label htmlFor="horizontal">가로</label>
                        <input
                            type="radio"
                            name="orientation"
                            id="vertical"
                            value="vertical"
                        />
                        <label htmlFor="vertical">세로</label>
                    </form>
                </SearchOptionLi>
            </SearchOptionUl>
        </SearchOptionContainer>
    );
};

export default SearchOption;
