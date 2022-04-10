import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../asset/search.svg';
import SearchOption from './SearchOption';
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

const SearchOptionButton = styled.p`
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    color: #5e5e5e;
`;

const Search = ({ updateQuery, searchOptions, setSearchOptions }) => {
    const savedSearchTags = localStorage.getItem('searchTags');
    const [searchOption, setSearchOption] = useState(false);
    const initialSearchTags = savedSearchTags
        ? JSON.parse(savedSearchTags)
        : [];
    const [searchTags, setSearchTags] = useState(initialSearchTags);
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
                        placeholder="검색어 입력 후 ENTER"
                    />
                    <SearchOptionButton onClick={toggleSearchOption}>
                        검색 옵션 {searchOption ? '닫기' : '열기'}
                    </SearchOptionButton>
                </SearchInputContainer>
                {searchOption && (
                    <SearchOption
                        searchOptions={searchOptions}
                        setSearchOptions={setSearchOptions}
                    />
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
