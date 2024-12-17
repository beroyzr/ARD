import React from 'react';

const CaseList = ({ cases }) => {
    return (
        <ul className="space-y-2">
            {cases.map((c) => (
                <li key={c.id} className="p-4 bg-white rounded-lg shadow">
                    <strong>Title:</strong> {c.title} <br />
                    <strong>Description:</strong> {c.description}<br />
                    <strong>Status:</strong> {c.status}<br />
                    <strong>Attachments:</strong> {c.attachments.join(", ")}<br />
                    <strong>Created At:</strong> {c.createdAt}<br />
                    <strong>Updated At:</strong> {c.updatedAt}<br />
                </li>
            ))}
        </ul>
    );
};

export default CaseList;
