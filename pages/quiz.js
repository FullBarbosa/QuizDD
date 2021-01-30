/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Button from '../src/components/Button/Button';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer/QuizContainer';
import Widget from '../src/components/Widget';
import db from '../db.json';

const quiz = () => {
  const router = useRouter();
  const { name } = router.query;
  const [questionsIndex, setQuestionsIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);
  const totalQuestions = db.questions.length;
  const question = db.questions[questionsIndex];
  const [resultado, setResultado] = useState([]);
  const [mensagem, setMensagem] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setValue('');
  }, [questionsIndex, mensagem]);

  const addResult = () => {
    if (value === question.answer) { setResultado([...resultado, true]); }
  };

  const hadleSubmit = () => {
    if (questionsIndex < 1) {
      addResult();
      setQuestionsIndex(() => questionsIndex + 1);
    } else {
      addResult();
      setMensagem(true);
    }
  };

  // eslint-disable-next-line no-shadow
  const QuestionWidget = ({ question, questionsIndex, totalQuestions }) => (
    <Widget>

      {loading ? (
        <>
          <Widget.Header>
            <h1>Carregando...</h1>
          </Widget.Header>
          <Widget.Content />
        </>
      )
        : (
          <>
            {mensagem ? (
              <>
                <Widget.Header>
                  <h1>{`Total de ponsto do ${name}`}</h1>

                </Widget.Header>

                <Widget.Content>
                  <h2>{resultado.length}</h2>
                </Widget.Content>
              </>
            )
              : (
                <>
                  <Widget.Header>
                    <h1>{mensagem}</h1>
                    <h1>{`Bem vindo ${name}`}</h1>
                  </Widget.Header>
                  <Widget.Header>
                    <h3>{`Pergunta ${questionsIndex + 1} de ${totalQuestions}`}</h3>
                  </Widget.Header>
                  <img
                    alt={question.title}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                    }}
                    src={question.image}
                  />
                  <Widget.Content>
                    <h2>
                      {question.title}
                    </h2>
                  </Widget.Content>

                  <Widget.Content>
                    <form onSubmit={(event) => {
                      event.preventDefault();
                      hadleSubmit();
                    }}
                    >

                      {question.alternatives.map((options, index) => {
                        const alternativaId = `Alternative__${index}`;

                        return (

                          <Widget.Topic
                            key={options}
                            as="label"
                          >
                            <input
                              type="radio"
                              id={alternativaId}
                              checked={value === index}
                              value={options}
                              onChange={() => setValue(index)}
                            />
                            {options}
                          </Widget.Topic>

                        );
                      })}

                      <Widget.Content>
                        <Button
                          type="submit"
                          disabled={value === null}
                        >
                          Confimar
                        </Button>

                      </Widget.Content>
                    </form>
                  </Widget.Content>
                </>
              )}

          </>
        )}

    </Widget>

  );
  return (
    <div>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>

          <QuestionWidget
            question={question}
            questionsIndex={questionsIndex}
            totalQuestions={totalQuestions}
          />
        </QuizContainer>

      </QuizBackground>
    </div>
  );
};

export default quiz;
