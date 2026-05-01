from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime, timedelta

app = FastAPI()

# -------- INPUT FORMAT --------
class RequestData(BaseModel):
    transcript: str
    team_members: Optional[List[str]] = []

# -------- MAIN API --------
@app.post("/process")
def process(data: RequestData):

    text = data.transcript
    members = data.team_members

    # split into sentences
    sentences = [s.strip() for s in text.split('.') if s.strip()]

    # summary (first 2 lines)
    summary = ". ".join(sentences[:2])

    tasks = []

    for s in sentences:
        if "will" in s.lower() or "should" in s.lower() or "need to" in s.lower():

            assigned_to = None

            # check if any team member name is present
            for m in members:
                if m.lower() in s.lower():
                    assigned_to = m
                    break

            # if not found → assign randomly or "Team"
            if not assigned_to:
                if members:
                    assigned_to = random.choice(members)
                else:
                    assigned_to = "Team"

                    
            days_to_add = 2
            future = datetime.now() + timedelta(days=days_to_add)
            future_date = future.strftime("%d-%m-%Y") + f" ({days_to_add} days)"

            tasks.append({
                "task": s,
                "assigned_to": assigned_to,
                "deadline": future_date,
                "priority": "High" if "urgent" in s.lower() else "Medium",
                "status": "Pending"
            })

    # if no tasks found
    if not tasks:
        tasks.append({
            "task": "Prepare report",
            "assigned_to": "Team",
            "deadline": "Tomorrow",
            "priority": "Medium",
            "status": "Pending"
        })

    return {
        "summary": summary,
        "tasks": tasks
    }