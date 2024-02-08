import styled from 'styled-components';

function CommentForm() {
  return (
    <Form>
      <TextArea />
      <Button type="submit">댓글 작성</Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const TextArea = styled.textarea`
  border: none;
  background: #f2f2f2;
  border-radius: 10px;
  padding: 1rem;
  min-height: 100px;
  width: 100%;
`;

const Button = styled.button`
  border: none;
  margin-left: auto;
  font-size: 100%;
  padding: 0.5rem;
  border-radius: 10px;
`;

export default CommentForm;
