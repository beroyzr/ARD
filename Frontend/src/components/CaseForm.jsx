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
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4 bg-white rounded-lg shadow">
            <input name="title" placeholder="Case Title" required className="input input-bordered w-full" />
            <input name="date" type="date" required className="input input-bordered w-full" />
            <input name="description" placeholder="Case Description" required className="input input-bordered w-full" />
            <input name="status" placeholder="Case Status" required className="input input-bordered w-full" />
            <input name="attachments" placeholder="Attachments (comma-separated)" required className="input input-bordered w-full" />
            <button type="submit" className="btn btn-primary w-full">Add Case</button>
        </form>
    );
};

export default CaseForm;
