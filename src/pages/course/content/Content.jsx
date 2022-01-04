import React, { useContext } from 'react';
import { Accordion } from 'react-bootstrap';
import ActivityContent from './ActivityContent';
import { CourseDataContext } from '../../../providers/CourseDataProvider';
import { FaPlusSquare } from 'react-icons/fa';
import NoGuestGuard from '../../../guards/NoGuestGuard';
import AddActivity from './AddActivity';
import AdminOrOwnInsrtuctorGuard from '../../../guards/AdminOrOwnInstructorGuard';

export default function Content() {
	const [course, _] = useContext(CourseDataContext);

	return (
		<NoGuestGuard>
			<div className='row'>
				<Accordion>
					{course.activities?.map((activity) => (
						<ActivityContent activity={activity} key={activity.id} />
					))}
					<AdminOrOwnInsrtuctorGuard>
						<Accordion.Item>
							<Accordion.Header>
								<div style={{ marginRight: '20px' }}>
									<span className='px-2'>
										<FaPlusSquare />
									</span>
									<span> Add Activity </span>
								</div>
							</Accordion.Header>
							<Accordion.Body>
								<AddActivity />
							</Accordion.Body>
						</Accordion.Item>
					</AdminOrOwnInsrtuctorGuard>
				</Accordion>
			</div>
		</NoGuestGuard>
	);
}
