import styled from 'styled-components';

const EmptyResultContainer = styled.div`
    width: 100%;
    text-align: center;
    padding: 16px 0;
    line-height: 1.3;
    color: var(--highlight);
`;

const EmptyResult = () => {
    return (
        <EmptyResultContainer>
            <h2>μ λ°! π</h2>
            κ²μ κ²°κ³Όκ° μμ΅λλ€.
            <br />
            λ€λ₯Έ ν€μλλ‘ λ€μ κ²μν΄μ£ΌμΈμ.
        </EmptyResultContainer>
    );
};

export default EmptyResult;
