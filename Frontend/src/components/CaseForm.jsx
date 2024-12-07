import React from 'react';
import { addCase } from '../services/api';

const CaseForm = ({ setCases }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newCase = Object.fromEntries(formData);
        const addedCase = await addCase(newCase);
        setCases(prevCases => [...prevCases, addedCase]);
        e.target.reset();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Case Title" required />
            <input name="date" type="date" required />
            <input name="description" placeholder="Case Description" required />
            <input name="status" placeholder="Case Status" required />
            <input name="attachments" placeholder="Attachments (comma-separated)" required />
            <button type="submit">Add Case</button>
        </form>
    );
};

export default CaseForm;
