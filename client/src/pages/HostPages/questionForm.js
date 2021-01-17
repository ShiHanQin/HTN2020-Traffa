import React, { useState } from "react";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';


const QuestionForm = ({setQuestionsArr}) => {

    const blankQuestion = { prompt: "" };
    const [questionState, setQuestionState] = useState([{ ...blankQuestion }]);

    const addQuestion = () => {
        setQuestionState([...questionState, { ...blankQuestion }]);
    };
    

    const handleQuestionChange = (e) => {
        const updatedQuestions = [...questionState];
        updatedQuestions[e.target.dataset.idx][e.target.className] = e.target.value;
        setQuestionState(updatedQuestions);
        setQuestionsArr(updatedQuestions);
    };

    return (
      <FormDiv>
        <QuestionsDiv>
        {questionState.map((val, idx) => {
          const promptId = `prompt-${idx}`;
          return (
            <>
              <label style={{fontSize:12}} htmlFor={promptId}>{`Prompt #${idx + 1}:`}</label>
              <textarea
                type="text"
                name={promptId}
                data-idx={idx}
                id={promptId}
                className="prompt"
                value={questionState[idx].prompt}
                onChange={handleQuestionChange}
              />
                            {/* <label htmlFor={durationId}>Duration (seconds):</label>
              <input
                type="number"
                name={durationId}
                data-idx={idx}
                id={durationId}
                className="duration"
                value={questionState[idx].duration}
                onChange={handleQuestionChange}
              /> */}
            </>
          );
        })}
        </QuestionsDiv>
        <QuestionButtonsDiv>
          <QuestionButton onClick={addQuestion}>Add New Question</QuestionButton>
        </QuestionButtonsDiv>
      </FormDiv>
    );
};


const QuestionButtonsDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const QuestionButton = styled(Button)`
  width: 200px;
  margin: 20px 10px 0px 10px;
  font-size: 0.75rem;
`;

const QuestionCard = styled.div`
  border-radius: 12px;
  margin: 4px;
  padding: 4px 16px 4px 16px;
  border: 1px solid rgba(0,0,0,.125);
`;


const QuestionsDiv = styled.div`
  overflow-y: auto;
  height: calc(100vh - 220px);
`;

const FormDiv= styled.div`
`;

export default QuestionForm;
