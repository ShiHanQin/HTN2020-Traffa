import React, { useState } from "react";
import styled from "styled-components";
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';


const QuestionForm = () => {

    const blankQuestion = { prompt: "", duration: "" };
    const [questionState, setQuestionState] = useState([{ ...blankQuestion }]);

    const addQuestion = () => {
        setQuestionState([...questionState, { ...blankQuestion }]);
    };

    const handleQuestionChange = (e) => {
        const updatedQuestions = [...questionState];
        updatedQuestions[e.target.dataset.idx][e.target.className] = e.target.value;
        setQuestionState(updatedQuestions);
    };

    const submitQuestions = () => {
        console.log("submitted");
        console.log(questionState);
    };

    const handleFocusChange = (options) => {
      console.log(options);
    }

    const handleTimeChange = (options) => {
      console.log(options);
    }

    return (
      <FormDiv>
        <TimePicker theme="classic"/>
        {/* <QuestionsDiv>
        {questionState.map((val, idx) => {
          const promptId = `prompt-${idx}`;
          const durationId = `duration-${idx}`;
          return (
            <div key={`question-${idx}`}>
              <label htmlFor={promptId}>{`Question #${idx + 1}:`}</label>
              <input
                type="text"
                name={promptId}
                data-idx={idx}
                id={promptId}
                className="prompt"
                value={questionState[idx].prompt}
                onChange={handleQuestionChange}
              />
              <label htmlFor={durationId}>Duration (seconds):</label>
              <input
                type="number"
                name={durationId}
                data-idx={idx}
                id={durationId}
                className="duration"
                value={questionState[idx].duration}
                onChange={handleQuestionChange}
              />
            </div>
          );
        })}
        </QuestionsDiv>
        <input type="button" value="Add New Question" onClick={addQuestion} />
        <input type="submit" value="Submit" onClick={submitQuestions}/> */}
      </FormDiv>
    );
};

const QuestionsDiv = styled.div`
  overflow-y: scroll;
  max-height: calc(100vh - 140px);
`;

const FormDiv= styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default QuestionForm;
