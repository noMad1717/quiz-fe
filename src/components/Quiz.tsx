import React, { useEffect, useState } from 'react'

interface Question {
    question: string
    answers: string[]
}

const questions: Question[] = require('../resources/data.json')

const Quiz: React.FC = () => {
    const [question, setQuestion] = useState<Question> (questions[0])
    const [inputVal, setInputVal] = useState<string>('')
    const [lives, setLives] = useState<number>(3)

    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const buttonRef = React.useRef<HTMLButtonElement | null>(null)

    useEffect((): void => {
        if (inputRef != null && inputRef.current != null) {
            inputRef.current.focus()
        }
    })

    const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Enter' && buttonRef != null && buttonRef.current != null) {
            buttonRef.current.click()
        }
    }

    useEffect(() => {
        const quizElem: HTMLElement | null = document.getElementById('quiz')
        quizElem!.addEventListener('keydown', handleKeyDown)

        return () => {
            quizElem!.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const checkAnswer = (): void => {
        const match: string | undefined = question.answers.find(a => a.trim().toLowerCase() === inputVal.trim().toLowerCase())
        if (!match) {
            setLives(lives - 1)
        }
    }

    const getNextQuestion = (): void => {
        const currIndex: number = questions.indexOf(question)
        const nextIndex: number = currIndex < questions.length - 1 ? currIndex + 1: 0

        checkAnswer()
        setInputVal('')
        setQuestion(questions[nextIndex])
    }

    return (
        <div id='quiz' className='quiz'>
            <h2>{question.question}</h2>
            <input ref={inputRef} type='text' value={inputVal} onChange={(e: React.FormEvent<HTMLInputElement>) => setInputVal(e.currentTarget.value)}/>
            <button ref={buttonRef} onClick={(e: React.FormEvent<HTMLButtonElement>) => getNextQuestion()}>Submit</button>
            <p>Lives: {lives}</p>
        </div>
    )
}

export default Quiz
