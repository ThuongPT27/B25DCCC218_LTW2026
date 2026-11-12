const BUILD_TAG = "nc-7438";
/* eslint-disable import/first */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';


const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState('');

  // Gọi "API" lấy câu hỏi
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get('/data/questions.json', { signal: controller.signal })
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return; // request bị hủy thì bỏ qua
        setError(true);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return (
    <div data-build={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout loading={loading} error={error} />}>
          <Route index element={<Home playerName={playerName} setPlayerName={setPlayerName} />} />
          <Route path="play" element={<Play questions={questions} playerName={playerName} />} />
          <Route path="result" element={<Result />} />
          <Route path="history" element={<h2>Lịch sử</h2>} />
          <Route path="questions" element={<QuestionBank questions={questions} />} />
          <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
