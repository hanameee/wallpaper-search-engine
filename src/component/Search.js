import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../asset/search.svg';
import SearchTag from './SearchTag';

const SearchTagContainer = styled.div`
    display: flex;
    width: 100%;
    overflow: auto;
    justify-content: center;
`;

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 4px 16px;
    width: 100%;
    align-items: center;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const SearchInputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const SearchInput = styled.input`
    background: transparent;
    font-size: 16px;
    outline: none;
    color: #5e5e5e;
    border: none;
    flex: auto;
    margin-left: 8px;
`;

const SearchOptionContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`;

const SearchOptionLabel = styled.p`
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    color: #5e5e5e;
`;

const SearchOptionUl = styled.ul`
    padding: 0;
`;

const SearchOptionLi = styled.li`
    list-style: none;
    margin: 16px 0;
`;

const SearchOption = styled.p`
    border: 1px solid #4cabff;
    color: #4cabff;
    padding: 4px;
    border-radius: 16px;
`;

const Search = ({ updateQuery, searchOptions, setSearchOptions }) => {
    const savedSearchTags = localStorage.getItem('searchTags');
    const { order, orientation, per_page } = searchOptions;
    const initialSearchTags = savedSearchTags
        ? JSON.parse(savedSearchTags)
        : [];
    const [searchTags, setSearchTags] = useState(initialSearchTags);
    const [searchOption, setSearchOption] = useState(false);
    const inputRef = useRef('');

    const toggleSearchOption = () => {
        setSearchOption((prev) => !prev);
    };

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            const currentInput = e.target.value;
            updateQuery(currentInput);
            setSearchTags((prev) => [...prev, currentInput]);
            updateSearchInput('');
        }
    };

    const updateSearchInput = (value) => {
        inputRef.current.value = value;
    };

    const searchTag = (tag) => {
        updateQuery(tag);
        updateSearchInput(tag);
    };

    const deleteTag = (idx) => {
        const newSearchTags = [...searchTags];
        newSearchTags.splice(idx, 1);
        setSearchTags(newSearchTags);
    };

    useEffect(() => {
        localStorage.setItem('searchTags', JSON.stringify(searchTags));
    }, [searchTags]);

    return (
        <>
            <SearchBoxContainer>
                <SearchInputContainer>
                    <SearchIcon width="24" fill="#5e5e5e" />
                    <SearchInput
                        ref={inputRef}
                        onKeyDown={onSearch}
                        placeholder="검색어 입력 후 엔터를 눌러주세요."
                    />
                    <SearchOptionLabel onClick={toggleSearchOption}>
                        검색 옵션 {searchOption ? '닫기' : '열기'}
                    </SearchOptionLabel>
                </SearchInputContainer>
                {searchOption && (
                    <SearchOptionContainer>
                        <SearchOptionUl>
                            <SearchOptionLi>
                                <SearchOption>정렬</SearchOption>
                                <form
                                    id="order"
                                    onChange={(e) =>
                                        setSearchOptions((prev) => {
                                            return {
                                                ...prev,
                                                order: e.target.value,
                                            };
                                        })
                                    }
                                >
                                    <input
                                        type="radio"
                                        name="order"
                                        id="latest"
                                        value="latest"
                                        defaultChecked={order === 'latest'}
                                    />
                                    <label htmlFor="latest">최신순</label>
                                    <input
                                        type="radio"
                                        name="order"
                                        id="popular"
                                        value="popular"
                                        defaultChecked={order === 'popular'}
                                    />
                                    <label htmlFor="popular">인기순</label>
                                </form>
                            </SearchOptionLi>
                            <SearchOptionLi>
                                <SearchOption>사진 방향</SearchOption>
                                <form
                                    id="orientation"
                                    onChange={(e) =>
                                        setSearchOptions((prev) => {
                                            return {
                                                ...prev,
                                                orientation: e.target.value,
                                            };
                                        })
                                    }
                                >
                                    <input
                                        type="radio"
                                        name="orientation"
                                        id="all"
                                        value="all"
                                        defaultChecked={orientation === 'all'}
                                    />
                                    <label htmlFor="all">모두</label>
                                    <input
                                        type="radio"
                                        name="orientation"
                                        id="horizontal"
                                        value="horizontal"
                                        defaultChecked={
                                            orientation === 'horizontal'
                                        }
                                    />
                                    <label htmlFor="horizontal">가로</label>
                                    <input
                                        type="radio"
                                        name="orientation"
                                        id="vertical"
                                        value="vertical"
                                        defaultChecked={
                                            orientation === 'vertical'
                                        }
                                    />
                                    <label htmlFor="vertical">세로</label>
                                </form>
                            </SearchOptionLi>
                            <SearchOptionLi>
                                <SearchOption>페이지 당 갯수</SearchOption>
                                <form
                                    id="per_page"
                                    onChange={(e) =>
                                        setSearchOptions((prev) => {
                                            return {
                                                ...prev,
                                                per_page: parseInt(
                                                    e.target.value
                                                ),
                                            };
                                        })
                                    }
                                >
                                    <input
                                        type="radio"
                                        name="per_page"
                                        id="10"
                                        value={10}
                                        defaultChecked={per_page === 10}
                                    />
                                    <label htmlFor="10">10</label>
                                    <input
                                        type="radio"
                                        name="per_page"
                                        id="20"
                                        value={20}
                                        defaultChecked={per_page === 20}
                                    />
                                    <label htmlFor="20">20</label>
                                    <input
                                        type="radio"
                                        name="per_page"
                                        id="30"
                                        value={30}
                                        defaultChecked={per_page === 30}
                                    />
                                    <label htmlFor="10">30</label>
                                </form>
                            </SearchOptionLi>
                        </SearchOptionUl>
                    </SearchOptionContainer>
                )}
            </SearchBoxContainer>
            <SearchTagContainer>
                {searchTags.map((tag, idx) => (
                    <SearchTag
                        key={tag + idx}
                        value={tag}
                        searchTag={() => searchTag(tag)}
                        deleteTag={() => deleteTag(idx)}
                    />
                ))}
            </SearchTagContainer>
        </>
    );
};

export default Search;
