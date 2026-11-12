import { POINTS, BONUS_PER_SECOND, STARS } from './data';

// Điểm của một câu trả lời đúng: điểm mức độ + điểm tốc độ
export const calcPoints = (question, timeLeft) =>
  POINTS[question.level] + timeLeft * BONUS_PER_SECOND;

// Cộng điểm của tất cả câu đã trả lời
export const calcTotal = (answers) =>
  answers.reduce((sum, a) => sum + a.points, 0);

// Mục đầu tiên trong STARS mà số câu đúng >= min
export const getStars = (correctCount) =>
  STARS.find((s) => correctCount >= s.min);

// 2 sao -> ★★☆
export const starText = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);
