import styles from './startPage.module.css'

export const StartPage = () => {
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
