import React, { useContext, useRef, useState } from 'react'
import { extractFormInput } from '../../../common/helpers';
import { logError, logSuccess } from '../../../common/logger';
import { PDF, VIDEO } from "../../../models/models";
import { CourseDataContext } from "../../../providers/CourseDataProvider";
import { addActivity } from '../../../services/course-service';

export default function AddActivity() {
    const [ course, setCourse ] = useContext(CourseDataContext);
    const [ activityType, setActivityType ] = useState(PDF);
    const addForm = useRef(null);

    const valueChanged = (value) => {
        addForm.current.reset();
        setActivityType(value);
    }

    const submitActivity = (ev) => {
        ev.preventDefault();
        const { title, description, file, video_url } = extractFormInput(ev.target);
        console.log({title, file, video_url});
        (async () => {
            try {
                const fD = new FormData();
                console.log(activityType);
                fD.append('activity', { title, type: +activityType, video_url });
                fD.append('file', file);

                const res = await addActivity(course.id, fD);

                const newActivity = {
                    id: res.data.id,
                    title,
                    description,
                    courseId: course.id,
                    type: +activityType
                };
                
                // // Update course with the new activities
                const newCourse = { ...course };
                newCourse.activities = [ ...newCourse.activities, newActivity ];

                console.log(newCourse);
                setCourse(newCourse);
                logSuccess("Changes Saved");
                addForm.current.reset();
            } catch (e) {
                logError(e.message);
            }
        })();
    }

    // Cancel form
    const cancelHandler = (ev) => {
        addForm.current.reset();
    }
    
    return (
        <>
            <div className="form-group">
                <label htmlFor='type'>Type</label>
                <select name="type" id = "type" className="form-control" onChange={ev => valueChanged(ev.target.value)}>
                    <option value={PDF}>PDF</option>
                    <option value={VIDEO}>Video</option>
                </select>
            </div>
            <form className='form' onSubmit={ (ev) => submitActivity(ev) } ref={addForm}>
                <div className="form-group my-1">
                    <label htmlFor="name">Activity Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        id="title"
                    />
                </div>
                <div className="form-group my-1">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        className="form-control"
                    />      
                </div>

                {
                    +activityType === +PDF && 
                        <div className="form-group">
                            <label htmlFor='file'>PDF File: </label>
                            <input
                                type='file'
                                accept='application/pdf'
                                id="file"
                                name="file"
                                className="form-control"
                            />
                        </div>
                }
                {
                    +activityType === +VIDEO &&
                        <div className="form-group">
                            <label htmlFor='video_url'>Youtube Link: </label>
                            <input
                                type='url'
                                id="video_url"
                                name="video_url"
                                className="form-control"
                            />
                        </div>
                }
                <div className="row">
                    <div className="col-md-12 text-end p-2">
                        <button type="submit" className="btn btn-primary m-1">Submit</button>
                        <button className="btn btn-primary m-1" onClick={cancelHandler}>Cancel</button>
                    </div>
                </div>
           </form>
        </>
    );
}