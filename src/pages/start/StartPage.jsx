import styles from './startPage.module.css'

export const StartPage = () => {
  

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

  return (
    <div className={styles.card}>
      {/* Отображение текущего прогресса игры */}
      <div className={styles.progress}>
        Вопрос 1 из ...
      </div>

      <div className={styles.gameBox}>
        <p>[Здесь в Уроке 3 появится флаг и варианты ответов]</p>
        <button className={styles.fakeBtn}>
          Завершить игру (тест результатов)
        </button>
      </div>
    </div>
  )
}
