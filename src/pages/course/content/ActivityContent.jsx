import React, { useState, useEffect, useContext } from "react";
import { Accordion } from "react-bootstrap";
import { FaFile, FaRegCheckSquare, FaRegSquare, FaVideo } from "react-icons/fa";
import { extractFormInput } from "../../../common/helpers";
import { logError, logSuccess } from "../../../common/logger";
import AdminOrOwnInstructorGuard from "../../../guards/AdminOrOwnInstructorGuard";
import LearnerGuard from "../../../guards/LearnerGuard";
import { ActivityMetadata, PDFContent, VIDEO, VideoContent } from "../../../models/models";
import { CourseDataContext } from "../../../providers/CourseDataProvider";
import { submitDone, getActivityContent, editActivityMetadata } from "../../../services/course-service";
import PDFViewer from "./PDFViewer";
import VideoViewer from "./VideoViewer";

export default function ActivityContent({ activity }) {
    const [content, setContent] = useState({});
    const [ course, setCourse ] = useContext(CourseDataContext);
    const [ edit, setEdit ]     = useState(false);
    
    // Run on init
    useEffect(() => {
      (async () => {
        try {
          const { data } = await getActivityContent(course.id, activity.id);
          
          const model = activity.type === 'video' ? VideoContent : PDFContent;
          
          const { value } = model.validate(data, { stripUnknown: true, presence: 'required'});
    
          setContent(value);
        } catch (e) {
          logError(e);
        }
      })();
      return () => {}
    }, []);
  
    // Submit Done
    const updateProgress = () => {
      // Optimistically update done progress
      const newState = { ...course };
      newState.progress.done[`${activity.id}`] =  true;
      newState.progress.total_completeness += (1 / course.activities.length) * 100;
      setCourse(newState);
  
      (async () => {
        try {
          const res = await submitDone(course.id, activity.id);
        } catch (e) {
          // Revert in case of failure
          course.progress.done[`${activity.id}`] = false;
          logError(e.message);
        }
      })();
    }

    // Edit activity
    const editActivity = (ev) => {
      ev.preventDefault();
      const newActivity = extractFormInput(ev.target);
      (async () => {
      try {
        const validActivity   = await ActivityMetadata.validateAsync(newActivity, { stripUnknown: true });
        const res             = await editActivityMetadata(course.id, activity.id, validActivity);
        
        // Update course with the new activities
        const newCourse = { ...course };
        newCourse.activities = newCourse.activities.map((act) => {
          if (act.id === activity.id) {
            return { ...act, ...validActivity };
          }
          return act;
        });
        console.log(newCourse);
        setCourse(newCourse);
        setEdit(false);
        logSuccess("Changes Saved");
      } catch (e) {
        logError(e.message);
      }
      })()
    }
  
    // Cancel form
    const cancelForm = (ev) => {
      setEdit(false);
    }

    // Render
    return (
      <Accordion.Item eventKey={activity.id} key={activity.id}>
        <Accordion.Header>
          {/* Check in case done for learners */}
          <LearnerGuard>
            <span className="px-2">
              { course.progress.done[activity.id] ? <FaRegCheckSquare /> : <FaRegSquare />}
            </span>
          </LearnerGuard>

          {/* Activity Icon */}
          <span className="px-2">
            {/* NEXT LINE IS BAD AND UNSCALABLE. TODO:: MIND SHIFTING IT TO THE SPECIFIC COMPONENT OF THE ACTIVITY TYPE */}
            { activity.type === VIDEO ? <FaVideo /> : <FaFile /> }
          </span>

          {/* Activity Title */}
          <span>
            { activity.title }
          </span>
        </Accordion.Header>

        {
          edit ? 
            <EditForm activity={activity} submitHandler={editActivity} cancelHandler={cancelForm} /> : (
            <Accordion.Body>
              <div>
                {/* Description */}
                <div>
                  <p>
                    {activity.description}
                  </p>
                </div>
                {/* Content Viewer */}
                <div>
                  {
                    activity.type === VIDEO ? 
                      (<VideoViewer url={ content.url } />) :
                      (<PDFViewer file={ content.file } />)
                  }
                </div>
              </div>
              {/* Submit done for learners */}
              {
                <LearnerGuard>
                  <div>
                    <button className="btn btn-primary" onClick={updateProgress}>Mark as done</button>
                  </div>
                </LearnerGuard>
              }
              {/* Edit in case of ADMIN or INSTRUCTOR */}
              {
                <AdminOrOwnInstructorGuard>
                  <button className="btn btn-primary" onClick={ () => setEdit(true) }>Edit Activity</button>
                </AdminOrOwnInstructorGuard>
              }
            </Accordion.Body>
          )
        }
      </Accordion.Item>
    )
}

const EditForm = ({ activity, submitHandler, cancelHandler }) => (
  <form onSubmit={ (ev) => submitHandler(ev) }>
    <div className="form-group my-1">
      <label htmlFor="name">Activity Title</label>
      <input
        type="text"
        name="title"
        className="form-control"
        id="title"
        defaultValue={activity.title}/>
    </div>
    <div className="form-group my-1">
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        className="form-control"
        defaultValue={activity.description}
      />      
    </div>
    <div className="row">
      <div className="col-md-12 text-end p-2">
        <button type="submit" className="btn btn-primary m-1">Submit</button>
        <button className="btn btn-primary m-1" onClick={cancelHandler}>Cancel</button>
      </div>
    </div>
  </form>

); 