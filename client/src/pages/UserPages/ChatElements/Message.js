import React from 'react';
import styled from 'styled-components'

const Message = (props) => {
    const { data, me, message, timestamp } = props;

    return (
        <>  
            <MessageWrapper me={me}>
                <Bubble me={me}>{message}</Bubble>
            </MessageWrapper>            
        </>
    )   
}

export default Message;

const MessageWrapper = styled.div`
    padding: 10px;
    display: flex;
    justify-content: ${props => props.me ? `flex-end` : `flex-start`};
`

const Bubble = styled.div`
    box-sizing: border-box;
    color: white;
    border-radius: 20px;
    max-width: 75%;
    padding: 10px 20px;
    background-color: ${props => props.me ? ' #ed7d3a' : 'red'};
    display: flex;
    /* justify-content:; */

`

const Username = styled.div`
    color: black;

`