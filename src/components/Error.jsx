import React from 'react'
import { Link } from 'react-router-dom';

export default function ErrorViewer({ backLink }) {
    return (
        <div className='full'>
            <h1> Ooops ! Error !!</h1>
            <Link to={backLink}>Go back</Link>
        </div>
    );
}