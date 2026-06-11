## Технологии
- React
- React Router
- Vite
- CSS Modules

## Всего у нас будет 4 урока:

- **Урок 1:** Архитектура, структура папок и настройка React Router.

- **Урок 2:** Каунтер (инкремент/декремент) на WelcomePage, динамическая строка прогресса в игре и каркас для разбора ошибок (верные/неверные карточки) на ResultPage.

- **Урок 3:** Самый сок логики! Импорт нашего JSON, алгоритм случайного выбора флагов, генерация 4 вариантов ответа (без дублирования правильной страны в неправильных кнопках) и обработка кликов с подсветкой (зеленый/красный).

- **Урок 4:** Подсчет и передача реального финального счета на ResultsPage, вывод итоговых результатов, кнопка «Играть заново» для полного сброса состояния игры и финальная полировка стилей.


## Урок 1: Настройка React Router

**Установлен роутер** (npm install react-router-dom)

Теперь настроим маршруты. Мы будем использовать современный подход с `createBrowserRouter`.

#### 1. Главный Layout (`src/layouts/Layout.jsx`)

Обертка для нашего приложения, чтобы, например, центрировать контент или добавить общий хедер.

```jsx
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Quiz</h1>
      </header>
      <main className={styles.main}>

        {/* Здесь будет рендериться текущая страница */}
        <Outlet />
      </main>
    </div>
  );
}
```

*Базовые стили (`src/layouts/Layout.module.css`):*

```css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: sans-serif;
  background-color: #f4f7f6;
  color: #333;
}
.header {
  text-align: center;
  padding: 1rem;
  background-color: #2c3e50;
  color: white;
}
.main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
```

#### 2. Заглушки для страниц

Чтобы роутер заработал, создадим три простых компонента для страниц.

* **`src/pages/welcome/WelcomePage.jsx`**
```jsx
import { useNavigate } from 'react-router-dom';
import styles from './WelcomePage.module.css';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <h2>Добро пожаловать в викторину!</h2>
      <p>Проверь свои знания флагов стран мира.</p>
      <button onClick={() => navigate('/quiz')}>Начать игру</button>
    </div>
  );
}
```


* **`src/pages/start/StartPage.jsx`**
```jsx
import styles from './StartPage.module.css';

export default function StartPage() {
  return (
    <div className={styles.card}>
      <h2>Вопрос 1 из ...</h2>
      <p>Здесь будет логика игры (Урок 2)</p>
    </div>
  );
}
```


* **`src/pages/results/ResultsPage.jsx`**
```jsx
import { useNavigate } from 'react-router-dom';
import styles from './ResultsPage.module.css';

export default function ResultsPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <h2>Результаты</h2>
      <p>Вы ответили правильно на ... вопросов</p>
      <button onClick={() => navigate('/')}>Играть снова</button>
    </div>
  );
}
```



*(Для стилей `.card` в каждом модуле можешь пока прописать простой `background: white; padding: 2rem; border-radius: 8px; text-align: center;`)*

#### 3. Конфигурация в `src/App.jsx`

Собираем всё вместе с помощью `createBrowserRouter`:

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout';
import WelcomePage from './pages/welcome/WelcomePage';
import StartPage from './pages/start/StartPage';
import ResultsPage from './pages/results/ResultsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
      {
        path: 'quiz',
        element: <StartPage />,
      },
      {
        path: 'results',
        element: <ResultsPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

```

---

## 🎯 Задание для закрепления Урока 1:

1. Настрой React Router, убедись, что при клике на кнопку «Начать игру» адресная строка меняется на `/quiz` и открывается `StartPage`.

Мы перейдем к самому интересному в **Уроке 2** — генерации неправильных вариантов (без дублирования правильного!), логике кликов, подсветке (зеленый/красный) и управлению состоянием игры.