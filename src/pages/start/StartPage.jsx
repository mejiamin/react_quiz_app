import { useLocation, useNavigate } from 'react-router-dom'
import styles from './startPage.module.css'

export const StartPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const totalCount = location.state?.totalCount || 10
  const currentQuestionIndex = 0

  const handleFakeEndGame = () => {
    const fakeHistory = [
      {
        question: "Флаг какой страны изображен?",
        correctAns: "Нигерия",
        userAns: "Нигерия",
        isCorrect: true,
        flag: "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg"
      },
      {
        question: "Флаг какой страны изображен?",
        correctAns: "Кения",
        userAns: "Мали",
        isCorrect: false,
        flag: "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg"
      }
    ]

    navigate('/results', { state: { history: fakeHistory } })
  }

  return (
    <div className={styles.card}>
      <div className={styles.progress}>
        Вопрос {currentQuestionIndex + 1} из {totalCount}
      </div>

      <div className={styles.gameBox}>
        <p>[Здесь в Уроке 3 появится флаг и варианты ответов]</p>

        <button onClick={handleFakeEndGame} className={styles.fakeBtn}>
          Завершить игру (тест результатов)
        </button>
      </div>
    </div>
  )
}
