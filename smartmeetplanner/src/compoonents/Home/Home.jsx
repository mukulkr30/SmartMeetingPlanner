import React, { useState } from "react";
import { MeetingTranscript } from "../MeetingTranscript/MeetingTranscript";
import { Analysis } from "../Analysis/Analysis";

function Home() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const handleResult = (data) => {
    setAnalysis(data);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 min-h-screen">

     
      <MeetingTranscript
        onResult={handleResult}   
        setLoading={setLoading}  
      />

      <Analysis data={analysis} loading={loading} />

    </div>
  );
}

export default Home;