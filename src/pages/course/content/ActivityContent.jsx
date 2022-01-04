import React, { useContext } from "react";
import { Accordion } from "react-bootstrap";
import { FaFile, FaRegCheckSquare, FaRegSquare, FaVideo } from "react-icons/fa";
import { logError, logSuccess } from "../../../common/logger";
import LearnerGuard from "../../../guards/LearnerGuard";
import { VIDEO } from "../../../models/models";
import { CourseDataContext } from "../../../providers/CourseDataProvider";
import { submitDone } from "../../../services/course-service";
import PDFViewer from "./PDFViewer";
import VideoViewer from "./VideoViewer";

export default function ActivityContent({ activity }) {
  const [course, setCourse] = useContext(CourseDataContext);


  // Submit Done
  const updateProgress = () => {
    (async () => {
      try {
        const res = await submitDone(course.id, activity.id);
        
        const newState = { ...course };
        newState.progress.done.append(activity.id);
        newState.progress.total_completeness += (1 / course.activities.length) * 100;
        setCourse(newState);    
        
        logSuccess("Marked as done !")
      } catch (e) {
        // Revert in case of failure
        logError(e.message);
      }
    })();
  }

  // Render
  return (
    <Accordion.Item eventKey={activity.id} key={activity.id}>
      <Accordion.Header>
        {/* Check in case done for learners */}
        <LearnerGuard>
          <span className="px-2">
            {course.progress.done.find(el => el === activity.id) ? <FaRegCheckSquare /> : <FaRegSquare />}
          </span>
        </LearnerGuard>

        {/* Activity Icon */}
        <span className="px-2">
          {activity.type === VIDEO ? <FaVideo /> : <FaFile />}
        </span>

        {/* Activity Title */}
        <span>
          {activity.title}
        </span>
      </Accordion.Header>

      <Accordion.Body>
        <div>
          {/* Content Viewer */}
          <div>
            {
              activity.type === VIDEO ?
                (<VideoViewer url={activity.video_url} />) :
                (<PDFViewer file={activity.file} />)
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
      </Accordion.Body>
    </Accordion.Item>
  )
}