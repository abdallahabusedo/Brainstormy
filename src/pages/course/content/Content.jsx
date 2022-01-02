import React, { useContext, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import ActivityContent from "./ActivityContent";
import { CourseDataContext } from "../../../providers/CourseDataProvider";
import { getUser } from "../../../services/user-service";
import { FaPlusSquare } from 'react-icons/fa'
import NoGuestGuard from "../../../guards/NoGuestGuard";

export default function Content () {
    const [course, _] = useContext(CourseDataContext);
    return (
      <>
        <NoGuestGuard>
          <div className="row">
            <Accordion>
              {
                course.activities.map((activity) => (<ActivityContent activity={activity} key={activity.id} />))
              }
              <Accordion.Item>
                <Accordion.Header>
                  <div style={{ marginRight: '20px'}}>
                    <span className="px-2"><FaPlusSquare /></span>
                    <span> Add Activity </span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                    Add item body
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </NoGuestGuard>
      </>
    );
}
  