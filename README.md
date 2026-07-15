### Технологии
- React
- React Router
- Vite
- CSS Modules

---

### Всего 4 урока:

- Урок 1: Архитектура, структура папок и настройка React Router.

- Урок 2: Каунтер (инкремент/декремент) на WelcomePage, динамическая строка прогресса в игре и каркас для разбора ошибок (верные/неверные карточки) на ResultPage.

- Урок 3: Самый сок логики! Импорт нашего JSON, алгоритм случайного выбора флагов, генерация 4 вариантов ответа (без дублирования правильной страны в неправильных кнопках) и обработка кликов с подсветкой (зеленый/красный).

- **Урок 4:** Подсчет и передача реального финального счета на ResultsPage, вывод итоговых результатов, кнопка «Играть заново» для полного сброса состояния игры и финальная полировка стилей.

---

## Урок 4 (Финальный): Подсчет очков, финальный экран и кнопка перезапуска

В этом уроке мы доработаем `ResultsPage.jsx`. Нам нужно:

1. Вычислить итоговый счет (сколько правильных ответов из общего количества).
2. Вывести красивый блок с результатами в самом верху страницы.
3. Добавить кнопку «Сыграть еще раз», которая сбросит всё и вернет пользователя на `WelcomePage`.

### Шаг 1: Обновление `ResultsPage.jsx`

Замени код в файле `src/pages/results/ResultsPage.jsx` на этот. Мы добавили подсчет переменной `correctCount` и вывели верхнюю карточку с результатами.

```jsx
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ResultsPage.module.css';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Достаем историю ответов, которую передали из StartPage
  const history = location.state?.history || [];

  // Высчитываем итоговый счет
  const correctCount = history.filter(item => item.isCorrect).length;
  const totalCount = history.length;

  // Функция перезапуска игры (возврат на главную)
  const handleRestart = () => {
    navigate('/');
  };

  // Если вдруг зашли на страницу напрямую без игры, покажем сообщение
  if (history.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.summaryCard}>
          <h2>Нет данных для отображения 😔</h2>
          <button onClick={handleRestart} className={styles.restartBtn}>
            Начать игру
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Главный блок с итоговым счетом */}
      <div className={styles.summaryCard}>
        <h2>🎉 Игра завершена!</h2>
        <p className={styles.scoreText}>
          Ваш результат: <span>{correctCount}</span> из <span>{totalCount}</span>
        </p>
        <button onClick={handleRestart} className={styles.restartBtn}>
          Сыграть еще раз
        </button>
      </div>

      <h3 className={styles.subtitle}>Детальный разбор полетов:</h3>
      
      {/* Список с ошибками и верными ответами (из Урока 2) */}
      <div className={styles.list}>
        {history.map((item, index) => (
          <div 
            key={index} 
            className={`
              ${styles.item} ${item.isCorrect ? styles.correct : styles.wrong}
            `}
          >
            <img src={item.flag} alt="Флаг" className={styles.flag} />
            <div className={styles.info}>
              <p className={styles.questionTitle}>
                <strong>Вопрос {index + 1}:</strong> {item.question}
              </p>
              <p>Ваш ответ: <span className={styles.badge}>
                {item.userAns}
              </span></p>
              {!item.isCorrect && (
                <p>Правильный ответ: <strong>{item.correctAns}</strong></p>
              )}
            </div>
            <div className={styles.icon}>
              {item.isCorrect ? '✅' : '❌'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Шаг 2: Финальные штрихи в CSS

Обнови `src/pages/results/ResultsPage.module.css`, чтобы добавить стили для верхней карточки и кнопки перезапуска. Старые стили списка я немного улучшил для красоты:

```css
.container {
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 2rem;
}

/* Стили для блока с результатами */
.summaryCard {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}

.scoreText {
  font-size: 1.5rem;
  margin: 1.5rem 0;
  color: #2c3e50;
}

.scoreText span {
  font-weight: bold;
  font-size: 2rem;
  color: #3498db;
}

.restartBtn {
  padding: 0.8rem 2.5rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background 0.2s;
}

.restartBtn:hover {
  background-color: #27ae60;
}

.subtitle {
  color: #34495e;
  margin-top: 1rem;
  text-align: center;
}

/* Стили для списка ответов */
.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem;
  background: white;
  border-radius: 8px;
  border-left: 6px solid;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.correct {
  border-left-color: #2ecc71;
}

.wrong {
  border-left-color: #e74c3c;
}

.flag {
  width: 80px;
  height: auto;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}

.info {
  flex: 1;
}

.questionTitle {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.info p {
  margin: 0.2rem 0;
  font-size: 0.95rem;
  color: #4a5568;
}

.badge {
  font-weight: 500;
  color: #2c3e50;
}

.icon {
  font-size: 1.5rem;
}
```

---

## 🚀 Финальное тестирование приложения!

1. Открой главную страницу (`/`). Выбери 5 вопросов с помощью кнопок `+` и `-`.
2. Нажми «Начать». Пройди все 5 вопросов, специально сделай пару ошибок, чтобы проверить всё.
3. На последнем вопросе нажми «Посмотреть результаты».
4. Убедись, что на странице `ResultsPage`:
* Правильно посчитан итоговый счет (например, 3 из 5).
* Выведен весь список из 5 карточек.
* Зеленые карточки имеют иконку ✅, а красные — ❌ и показывают, где ты ошибся.


5. Нажми **«Сыграть еще раз»**. Приложение должно вернуть тебя на начальный экран, а состояние вопросов должно полностью сброситься.

Поздравляю! Ты с нуля написал полноценное SPA-приложение (Single Page Application) на React с маршрутизацией, модульными стилями и отличной игровой логикой!
