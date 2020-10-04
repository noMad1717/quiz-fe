import React, { useState } from 'react'

const questions: [{ question: string, answers: string[]}] = require('../resources/data.json')

const Quiz = (): JSX.Element => {
    const [question, setQuestion] = useState<{ question: string, answers: string[] }> (questions[0])
    const [inputVal, setInputVal] = useState<string>('')

    const getNextQuestion = (): void => {
        const currIndex: number = questions.indexOf(question)
        const nextIndex: number = currIndex < questions.length - 1 ? currIndex + 1: 0

        setInputVal('')
        setQuestion(questions[nextIndex])
    }

    return (
        <div>
            <h2>{question.question}</h2>
            <input type='text' value={inputVal} onChange={(e: React.FormEvent<HTMLInputElement>) => setInputVal(e.currentTarget.value)}/>
            <button onClick={(e: React.FormEvent<HTMLButtonElement>) => getNextQuestion()}>Submit</button>
        </div>
    )
}

export default Quiz
