### Технологии
- React
- React Router
- Vite
- CSS Modules1

---

### Всего у нас 4 урока:

- **Урок 1:** Архитектура, структура папок и настройка React Router.

- **Урок 2:** Каунтер (инкремент/декремент) на WelcomePage, динамическая строка прогресса в игре и каркас для разбора ошибок (верные/неверные карточки) на ResultPage.

- **Урок 3:** Самый сок логики! Импорт нашего JSON, алгоритм случайного выбора флагов, генерация 4 вариантов ответа (без дублирования правильной страны в неправильных кнопках) и обработка кликов с подсветкой (зеленый/красный).

- **Урок 4:** Подсчет и передача реального финального счета на ResultsPage, вывод итоговых результатов, кнопка «Играть заново» для полного сброса состояния игры и финальная полировка стилей.

---

## Урок 2: Настройка каунтера, прогресса и разбора ошибок

### Шаг 1: Кнопки Counter на `WelcomePage`

В этом компоненте мы создаем стейт для количества вопросов, функции `increment` и `decrement` и передаем это число дальше при клике.

**`src/pages/welcome/WelcomePage.jsx`**

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import quizData from '../../data/quiz_questions.json';
import styles from './WelcomePage.module.css';

export default function WelcomePage() {
  const navigate = useNavigate();
  const maxQuestions = quizData.questions.length; // Всего 30
  
  // Счетчик вопросов (по умолчанию 10)
  const [questionsCount, setQuestionsCount] = useState(10);

  const increment = () => {
    if (questionsCount < maxQuestions) {
      setQuestionsCount(prev => prev + 1);
    }
  };

  const decrement = () => {
    if (questionsCount > 1) {
      setQuestionsCount(prev => prev - 1);
    }
  };

  const handleStart = () => {
    // Передаем выбранное количество вопросов на страницу игры
    navigate('/quiz', { state: { totalCount: questionsCount } });
  };

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
```

*Добавь стили в `src/pages/welcome/WelcomePage.module.css`:*

```css
.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
}
.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
}
.btn {
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid #ccc;
  background: #f8f9fa;
  border-radius: 4px;
}
.value {
  font-size: 1.5rem;
  font-weight: bold;
  min-width: 40px;
}
.startBtn {
  padding: 0.7rem 2rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
```

---

### Шаг 2: Отображение прогресса на `StartPage`

Здесь мы ловим переданное число и выводим строчку с прогрессом («Вопрос X из Y»). Саму игру пока делаем статической заглушкой, но добавляем кнопку «Имитировать завершение», чтобы передать тестовые данные на финальный экран для проверки детального разбора.

**`src/pages/start/StartPage.jsx`**

```jsx
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './StartPage.module.css';

export default function StartPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Получаем переданное количество вопросов (или берем 10 по умолчанию)
  const totalCount = location.state?.totalCount || 10;
  const currentQuestionIndex = 0; // В этом уроке просто заглушка первого вопроса

  // Имитируем историю ответов для Урока 2, чтобы проверить ResultPage
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
    ];

    navigate('/results', { state: { history: fakeHistory } });
  };

  return (
    <div className={styles.card}>
      {/* Отображение текущего прогресса игры */}
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
  );
}
```

*Добавь стили в `src/pages/start/StartPage.module.css`:*

```css
.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
}
.progress {
  font-size: 1.1rem;
  font-weight: bold;
  color: #7f8c8d;
  margin-bottom: 1rem;
}
.gameBox {
  border: 2px dashed #ccc;
  padding: 2rem;
  margin-top: 1rem;
}
.fakeBtn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

---

### Шаг 3: Детальный разбор на `ResultsPage`

Эта страница принимает массив выполненных ответов и рендерит карточки ошибок/успехов.

**`src/pages/results/ResultsPage.jsx`**

```jsx
import { useLocation } from 'react-router-dom';
import styles from './ResultsPage.module.css';

export default function ResultsPage() {
  const location = useLocation();
  // Достаем историю ответов
  const history = location.state?.history || [];

  return (
    <div className={styles.container}>
      <h2>Разбор полетов</h2>
      
      <div className={styles.list}>
        {history.map((item, index) => (
          <div 
            key={index} 
            className={`${styles.item} ${item.isCorrect ? styles.correct : styles.wrong}`}
          >
            <img src={item.flag} alt="Флаг" className={styles.flag} />
            <div className={styles.info}>
              <p><strong>Вопрос {index + 1}:</strong> {item.question}</p>
              <p>Ваш ответ: <span className={styles.badge}>{item.userAns}</span></p>
              {!item.isCorrect && (
                <p>Правильный ответ: <strong>{item.correctAns}</strong></p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

*Добавь стили в `src/pages/results/ResultsPage.module.css`:*

```css
.container {
  max-width: 500px;
  width: 100%;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}
.item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border-left: 6px solid;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.correct {
  border-left-color: #2ecc71;
}
.wrong {
  border-left-color: #e74c3c;
}
.flag {
  width: 60px;
  height: auto;
  border: 1px solid #eee;
}
.info p {
  margin: 0.2rem 0;
  font-size: 0.95rem;
}
```

---

## Установка зависимостей

```bash
npm install
```

## Запуск в режиме разработки

```bash
npm run dev
```

## 🎯 Проверка Урока 2:

1. Зайди на главную, пощелкай `+` и `-`. Убедись, что каунтер не уходит ниже 1 и выше 30.
2. Нажми «Начать». Проверь, отображается ли на `StartPage` выбранное тобой число в строке прогресса («Вопрос 1 из Х»).
3. Нажми синюю кнопку «Завершить игру». Роутер перекинет тебя на `ResultsPage`, где отобразятся две тестовые карточки (одна зеленая с верным ответом, одна красная с ошибкой).

Мы перейдем к **Уроку 3** — начнем писать алгоритм генерации вариантов без дубликатов и добавим реальную подсветку кнопок!
