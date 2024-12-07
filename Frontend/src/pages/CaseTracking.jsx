import React, { useState, useEffect } from 'react';
import { getCases } from '../services/api';
import CaseForm from '../components/CaseForm';
import CaseList from '../components/CaseList';

const CaseTracking = () => {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            const data = await getCases();
            setCases(data);
        };
        fetchCases();
    }, []);

    return (
        <div>
            <h1>Case Tracking</h1>
            <CaseForm setCases={setCases} />
            <CaseList cases={cases} />
        </div>
    );
};

export default CaseTracking;
