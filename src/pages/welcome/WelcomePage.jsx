import { useState } from 'react';
import styles from './welcomePage.module.css'
import { quizData } from '@/data';
import { useNavigate } from 'react-router-dom';

export const WelcomePage = () => {
  const navigate = useNavigate()
  const [questionsCount, setQuestionsCount] = useState(10)

  const maxQuestions = quizData.questions.length

  const increment = () => {
    if (questionsCount < maxQuestions) {
      setQuestionsCount(prev => prev + 1)
    }
  }

  const decrement = () => {
    if (questionsCount > 1) {
      setQuestionsCount(prev => prev - 1)
    }
  }

  const handleStart = () => {
    navigate('/quiz', { state: { totalCount: questionsCount } })
  }

  return (
    <div className={styles.card}>
      <h2>🌍 Викторина по странам</h2>
      <p>Выберите количество вопросов:</p>

      <div className={styles.counter}>
        <button onClick={decrement} className={styles.btn}>-</button>
        <span className={styles.value}>{questionsCount}</span>
        <button onClick={increment} className={styles.btn}>+</button>
      </div>

      <button onClick={handleStart} className={styles.startBtn}>
        Начать
      </button>
    </div>
  );
}
