import React from 'react';

const CaseList = ({ cases }) => {
    return (
        <ul>
            {cases.map((c) => (
                <li key={c.id}>
                    <strong>Title:</strong> {c.title} <br />
                    <strong>Description:</strong> {c.description}<br/>
                    <strong>Status: </strong> {c.status}<br/>
                    <strong>Attachments:</strong> {c.attachments.join(", ")}<br/>
                    <strong>Created At:</strong> {c.createdAt}<br/>
                    <strong>Updated At:</strong> {c.updatedAt}<br/>
                </li>
            ))}
        </ul>
    );
};

export default CaseList;
