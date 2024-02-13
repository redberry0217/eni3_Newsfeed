export const dateFormat = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'Asia/Seoul'
  };
  return new Date(date).toLocaleString('ko-KR', options);
};

export const mypageDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  return new Date(date).toLocaleDateString('ko-KR', options).replace(/\//g, '.');
};
