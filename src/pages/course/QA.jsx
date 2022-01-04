import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import axiosClient from '../../common/client';
import { CourseDataContext } from '../../providers/CourseDataProvider';
import { getUser } from '../../services/user-service';

export default function QA() {
  const [ questions, setQuestions ] = useState([]);
  const [course, setCourse] = useContext(CourseDataContext);
  const user = getUser();
  let courseId = course.id;

  const getQuestionsAndAnswers = async () => {
    const qRes = await getQuestions(courseId);
    const newQuestions = [ ...(qRes.data) ];

    for (const [idx, qu] of newQuestions.entries()) {
        newQuestions[idx].answers = (await getAnswers(courseId, qu.id)).data;
    }
    console.log(newQuestions);
    setQuestions(newQuestions);
  }

  useEffect(() => {
    (async() => {
        await getQuestionsAndAnswers();
    })();
  }, []);

  const addQuestion = async (ev) => {
    ev.preventDefault();
    await axiosClient.post('/question', { courseId: course.id, body: ev.target.elements[0].value, header: 'Question' });

    await getQuestionsAndAnswers();

  };

  const addAnswer = async (questionId, ev) => {
    ev.preventDefault();
    await axiosClient.post('/answer', { courseId: course.id, body: ev.target.elements[0].value, questionId: questionId, header: 'Answer' });
    await getQuestionsAndAnswers();
  };

  return (
      <div style={{textAlign: 'left'}}>
          <form onSubmit={addQuestion}>
            <div className="form-group">
                <label htmlFor="post_question">Add Question</label>
                <input type="text" name="post_question" id="post_question" /> 
            </div>
            <input type="submit" className="btn btn-primary" />
          </form>

        
          {
              questions && questions.map(qu => (
                <div className="row" key={qu.id}>
                    <div>
                        <h5>{qu.user.username}</h5>
                        <p>{qu.body}</p>
                    </div>

                    <div className="pr-2">
                        <form onSubmit={(ev) => addAnswer(qu.id, ev)}>
                            <div className="form-group">
                                <label htmlFor="post_question">Add Answer</label>
                                <input type="text" name="post_question" id="post_question" /> 
                            </div>
                            <input type="submit" className="btn btn-primary" />
                        </form>
                        {
                            qu.answers?.map(ans => (
                                <div key={ans.id}>
                                    <h6>{ans.user.username}</h6>
                                    <p>{ans.body}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
              ))
          }
      </div>
  );
}

function getQuestions(courseId) {
  return axiosClient.get(`/course/questions?courseId=${courseId}`)
}

function getAnswers(courseId, questionId) {
    return axiosClient.get(`/course/question/answers?courseId=${courseId}&questionId=${questionId}`);
}
