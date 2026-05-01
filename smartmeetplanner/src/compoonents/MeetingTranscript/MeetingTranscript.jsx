import { useState } from "react";

export function MeetingTranscript({ onResult }) {
  const [text, setText] = useState("");
  const [members, setMembers] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert("Transcript is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://smart-meeting-ai.onrender.com/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: text,
          team_members: members
            .split(",")
            .map((m) => m.trim())
            .filter((m) => m !== ""),
        }),
      });

      const data = await res.json();
      onResult(data);
    } catch (err) {
      console.error(err);
      alert("Error processing meeting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <h2 className="text-lg font-semibold">Meeting Transcript</h2>

      {/* Transcript */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste transcript here..."
        className="w-full h-48 border rounded-xl p-3 mt-3"
      />

      {/* Team Members */}
      <input
        type="text"
        value={members}
        onChange={(e) => setMembers(e.target.value)}
        placeholder="Enter team members (comma separated)"
        className="w-full mt-4 px-3 py-2 border rounded-xl"
      />

      {/* Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-5 w-full py-3 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white"
      >
        {loading ? "Processing..." : "Analyze Meeting"}
      </button>
    </div>
  );
}