import styled from 'styled-components';

function ArticleList({ list }) {
  return (
    <Section>
      {list.map((article) => {
        return (
          <Article key={article.id}>
            {article.author}
            <Title>{article.title}</Title>
            <time>{new Date(article.createdAt).toLocaleString('ko-KR', { timeZone: 'UTC' })}</time>
            <p>{article.content}</p>
            <span>{article.like}</span>
          </Article>
        );
      })}
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f2f2f2;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
`;

export default ArticleList;
