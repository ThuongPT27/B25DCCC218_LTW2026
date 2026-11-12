import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../data';

const QuestionBank = ({ questions }) => {
  const [filter, setFilter] = useState('all'); // 'all' | 'official' | 'reserve'
  const [sort, setSort] = useState('id'); // 'id' | 'asc' | 'desc'
  const [keyword, setKeyword] = useState('');

  // Đếm bằng filter(), không ghi cứng
  const officialCount = questions.filter((q) => !q.reserve).length;
  const reserveCount = questions.filter((q) => q.reserve).length;

  const handleKeywordShift = (e) => setKeyword(e.target.value);

  // 1) lọc theo loại  2) lọc theo từ khóa  3) sắp xếp trên BẢN SAO
  const byType = questions.filter((q) => {
    if (filter === 'official') return !q.reserve;
    if (filter === 'reserve') return q.reserve;
    return true;
  });
  const byKeyword = byType.filter((q) =>
    q.question.toLowerCase().includes(keyword.toLowerCase())
  );
  const list = [...byKeyword].sort((a, b) => {
    if (sort === 'asc') return a.level - b.level || a.id - b.id;
    if (sort === 'desc') return b.level - a.level || a.id - b.id;
    return a.id - b.id;
  });

  const filterButton = (value, text) => (
    <button
      className={`filter-btn ${filter === value ? 'active' : ''}`}
      onClick={() => setFilter(value)}
    >
      {text}
    </button>
  );

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div className="toolbar">
        {filterButton('all', `Tất cả (${questions.length})`)}
        {filterButton('official', `Chính thức (${officialCount})`)}
        {filterButton('reserve', `Dự bị (${reserveCount})`)}
      </div>
      <div className="toolbar">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="id">Theo số thứ tự</option>
          <option value="asc">Mức độ: Dễ → Khó</option>
          <option value="desc">Mức độ: Khó → Dễ</option>
        </select>
        <input
          type="text"
          placeholder="Tìm kiếm theo nội dung câu hỏi"
          value={keyword}
          onChange={handleKeywordShift}
          style={{ minWidth: 280 }}
        />
      </div>
      <p>{`Có ${list.length} câu hỏi`}</p>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Loại</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {list.map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{LEVELS[q.level]}</td>
              <td>{q.reserve ? 'Dự bị' : 'Chính thức'}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;
