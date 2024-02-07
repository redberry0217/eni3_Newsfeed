function ArticleList({ list }) {
  return (
    <>
      {list.map((article) => {
        return (
          <article key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <time>{new Date(article.createdAt).toLocaleString('ko-KR', { timeZone: 'UTC' })}</time>
            <button>{article.like}</button>
          </article>
        );
      })}
    </>
  );
}

export default ArticleList;
