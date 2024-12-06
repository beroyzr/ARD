import React, { useState, useEffect } from 'react';
import { getCases, addCase } from '../services/api';

const CaseTracking = () => {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            const data = await getCases();
            setCases(data);
        };
        fetchCases();
    }, []);

    const handleAddCase = async (newCase) => {
        const addedCase = await addCase(newCase);
        setCases([...cases, addedCase]);
    };

    return (
        <div>
            <h1>Case Tracking</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newCase = Object.fromEntries(formData);
                handleAddCase(newCase);
            }}>
                <input name="title" placeholder="Case Title" required />
                <input name="date" type="date" required />
                <textarea name="summary" placeholder="Case Summary" required />
                <button type="submit">Add Case</button>
            </form>
            <ul>
                {cases.map((c) => (
                    <li key={c.id}>
                        <strong>{c.title}</strong> - {c.date}
                        <p>{c.summary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CaseTracking;
