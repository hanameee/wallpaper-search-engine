import styled from 'styled-components';
import { ReactComponent as PrevIcon } from '../asset/prev.svg';
import { ReactComponent as NextIcon } from '../asset/next.svg';

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px;
    color: var(--text); ;
`;

const PageSelect = styled.select`
    cursor: pointer;
    background-color: var(--primary);
    border: none;
    font-size: 16px;
    color: var(--highlight);
    font-weight: bold;
    font-family: inherit;
    &:focus {
        outline: none;
    }
`;

<<<<<<< HEAD
const Pagination = ({ total, per_page, page, setSearchOptions }) => {
    const numOfPages = total ? Math.ceil(total / per_page) : 0;
=======
const Pagination = ({ page, setPage, numOfPages }) => {
>>>>>>> main
    return (
        <Nav>
            {page !== 1 && (
                <PrevIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
<<<<<<< HEAD
                    onClick={() =>
                        setSearchOptions((prev) => {
                            return { ...prev, page: page - 1 };
                        })
                    }
=======
                    onClick={() => setPage((prev) => prev - 1)}
>>>>>>> main
                />
            )}
            {`총 ${numOfPages} 중 `}
            <PageSelect
                name="page"
                value={page}
<<<<<<< HEAD
                onChange={(e) => {
                    setSearchOptions((prev) => {
                        return { ...prev, page: parseInt(e.target.value) };
                    });
                }}
            >
                {numOfPages &&
                    Array(numOfPages)
                        .fill()
                        .map((_, i) => (
                            <option value={i + 1} key={i}>
                                {i + 1}
                            </option>
                        ))}
=======
                onChange={(e) => setPage(parseInt(e.target.value))}
            >
                {Array(numOfPages)
                    .fill()
                    .map((data, idx) => (
                        <option value={idx + 1} key={idx + 1}>
                            {idx + 1}
                        </option>
                    ))}
>>>>>>> main
            </PageSelect>
            페이지
            {page !== numOfPages && (
                <NextIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
<<<<<<< HEAD
                    onClick={() =>
                        setSearchOptions((prev) => {
                            return { ...prev, page: page + 1 };
                        })
                    }
=======
                    onClick={() => setPage((prev) => prev + 1)}
>>>>>>> main
                />
            )}
        </Nav>
    );
};

export default Pagination;
