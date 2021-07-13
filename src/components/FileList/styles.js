import styled from "styled-components";

export const Container = styled.ul`
    margin-top: 10px;

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 5px;
        margin-left: 5px;
        color: #444;


        & + li {
            margin-top: 15px;
        }
    }
`;

export const FileInfo = styled.div`
    display: flex;
    align-items: center;   

    div {
        display: flex;
        flex-direction: column;

        span {
            font-size: 10px;
            color: #999;

            button {
                border: 0;
                background: transparent;
                color: #e57878;      
                cursor: pointer;
            }
        }
    }
`;

export const Preview = styled.div`
    width: 25px;
    height: 25px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 10px;
`;