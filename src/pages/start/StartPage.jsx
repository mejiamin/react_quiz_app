import { useLocation, useNavigate } from 'react-router-dom'
import styles from './startPage.module.css'
import { useEffect, useMemo, useState } from 'react'
import { quizData } from '@/data'

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

function generateOptions(correctAnswer, allCountries) {
  const wrongCountriesFiltered = allCountries.filter(country => country !== correctAnswer)

  const randomWrongAnswers = shuffleArray(wrongCountriesFiltered).slice(0, 3)

  return shuffleArray([...randomWrongAnswers, correctAnswer])
}

export const StartPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const totalCount = location.state?.totalCount || 10

  const questionsForGame = useMemo(() => {
    return shuffleArray(quizData.questions).slice(0, totalCount)
  }, [totalCount])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [options, setOptions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answersHistory, setAnswersHistory] = useState([])

  const currentQuestion = questionsForGame[currentIndex]

  useEffect(() => {
    if (currentQuestion) {
      const generated =
        generateOptions(currentQuestion.correctAnswer, quizData.countries)

      setOptions(generated)
      setSelectedAnswer(null)
    }
  }, [currentIndex, currentQuestion])

  if (!currentQuestion) return null

  const handleOptionClick = (chosenOption) => {
    if (selectedAnswer) return

    setSelectedAnswer(chosenOption)
    const isCorrect = chosenOption === currentQuestion.correctAnswer

    setAnswersHistory(prev => [
      ...prev,
      {
        question: currentQuestion.question,
        correctAns: currentQuestion.correctAnswer,
        userAns: chosenOption,
        isCorrect: isCorrect,
        flag: currentQuestion.flag
      }
    ])
  }

  const handleNext = () => {
    if (currentIndex < questionsForGame.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      navigate('/results', { state: { history: answersHistory } })
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.progress}>
        Вопрос {currentIndex + 1} из {questionsForGame.length}
      </div>

      <h2 className={styles.questionText}>{currentQuestion.question}</h2>

      <img
        src={currentQuestion.flag}
        alt="Флаг страны"
        className={styles.flagImage}
      />

      <div className={styles.optionsGrid}>
        {options.map((option, index) => {
          let btnClass = styles.optionBtn

          if (selectedAnswer) {
            if (option === currentQuestion.correctAnswer) {
              btnClass += ` ${styles.correct}`
            } else if (option === selectedAnswer) {
              btnClass += ` ${styles.wrong}`
            }
          }

          return (
            <button
              key={index}
              className={btnClass}
              onClick={() => handleOptionClick(option)}
              disabled={!!selectedAnswer}
            >
              {option}
            </button>
          )
        })}
      </div>

      {selectedAnswer && (
        <button onClick={handleNext} className={styles.nextBtn}>
          {currentIndex === questionsForGame.length - 1
            ? 'Посмотреть результаты'
            : 'Дальше →'
          }
        </button>
      )}
    </div>
  )
}
