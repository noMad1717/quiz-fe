import React, { useState } from 'react'

interface Question {
    question: string
    answers: string[]
}

const questions: Question[] = require('../resources/data.json')

const Quiz: React.FC = () => {
    const [question, setQuestion] = useState<Question> (questions[0])
    const [inputVal, setInputVal] = useState<string>('')

    const getNextQuestion = (): void => {
        const currIndex: number = questions.indexOf(question)
        const nextIndex: number = currIndex < questions.length - 1 ? currIndex + 1: 0

        setInputVal('')
        setQuestion(questions[nextIndex])
    }

    return (
        <div className='quiz'>
            <h2>{question.question}</h2>
            <input type='text' value={inputVal} onChange={(e: React.FormEvent<HTMLInputElement>) => setInputVal(e.currentTarget.value)}/>
            <button onClick={(e: React.FormEvent<HTMLButtonElement>) => getNextQuestion()}>Submit</button>
        </div>
    )
}

export default Quiz
