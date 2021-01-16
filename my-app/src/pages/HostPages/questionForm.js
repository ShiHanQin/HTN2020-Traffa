import React, { useState } from "react";

const QuestionForm = () => {

    const blankCat = { name: "", age: "" };
    const [catState, setCatState] = useState([{ ...blankCat }]);

    const addCat = () => {
        setCatState([...catState, { ...blankCat }]);
    };

    const handleCatChange = (e) => {
        const updatedCats = [...catState];
        updatedCats[e.target.dataset.idx][e.target.className] = e.target.value;
        setCatState(updatedCats);
    };

    return (
        <form>
            <input type="button" value="Add New Cat" onClick={addCat} />
            {catState.map((val, idx) => {
                const catId = `name-${idx}`;
                const ageId = `age-${idx}`;
                return (
                    <div key={`cat-${idx}`}>
                        <label htmlFor={catId}>{`Question #${idx + 1}:`}</label>
                        <input
                            type="text"
                            name={catId}
                            data-idx={idx}
                            id={catId}
                            className="name"
                            value={catState[idx].name}
                            onChange={handleCatChange}
                        />
                        <label htmlFor={ageId}>Duration:</label>
                        <input
                            type="text"
                            name={ageId}
                            data-idx={idx}
                            id={ageId}
                            className="age"
                            value={catState[idx].age}
                            onChange={handleCatChange}
                        />
                    </div>
                );
            })}
            <input type="submit" value="Submit" />
        </form>
    );
};

export default QuestionForm;
