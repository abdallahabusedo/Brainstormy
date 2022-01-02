import React from 'react'
import { LEARNER } from "../models/models";
import { getUser } from "../services/user-service";


export default function LearnerGuard({ children }) {
    const user = getUser();

    return (
        <>
            {
                user.type === LEARNER && (<> { children } </>)
            }
        </>
    );
}