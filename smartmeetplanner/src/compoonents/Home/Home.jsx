import React from 'react'
import { useState } from 'react';
import { MeetingTranscript } from '../MeetingTranscript/MeetingTranscript';
import { Analysis } from '../Analysis/Analysis';
function Home() {
    const [analysis, setAnalysis] = useState(null);

    const handleAnalyze = (text) => {
    // Replace with backend call
    setAnalysis({
        summary: "Discussion about roadmap and resource allocation.",
        tasks: [
            { task: "Prioritize feature launch", priority: "High" },
            { task: "Allocate design resources", priority: "Medium" },
        ],
        });
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 min-h-screen h-[80%] ">
            <MeetingTranscript onAnalyze={handleAnalyze} />
            <Analysis data={analysis} />
        </div>
    )
}

export default Home
