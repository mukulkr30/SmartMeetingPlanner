from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime, timedelta

app = FastAPI()

#              CORS CONFIG              
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

#              INPUT FORMAT 
class RequestData(BaseModel):
    transcript: str
    team_members: Optional[List[str]] = []

# -------- DEADLINE EXTRACTION --------
def get_deadline(text):
    today = datetime.now()
    text = text.lower()

    days_map = {
        "monday": 0,
        "tuesday": 1,
        "wednesday": 2,
        "thursday": 3,
        "friday": 4,
        "saturday": 5,
        "sunday": 6
    }

    days_to_add = 0

    if "tomorrow" in text:
        days_to_add = 1
    elif "next week" in text:
        days_to_add = 7
    else:
        for day in days_map:
            if day in text:
                target = days_map[day]
                current = today.weekday()
                diff = (target - current + 7) % 7
                days_to_add = diff
                break

    future = today + timedelta(days=days_to_add)

    #  FORMAT OUTPUT 
    if days_to_add == 0:
        return future.strftime("%d-%m-%Y") + " (Today)"
    elif days_to_add == 1:
        return future.strftime("%d-%m-%Y") + " (1 day)"
    else:
        return future.strftime("%d-%m-%Y") + f" ({days_to_add} days)"

             # TASK CLEANING
def clean_task(sentence):
    words = sentence.lower().split()

    remove_words = ["will", "should", "need", "to", "needs", "have", "has", "by"]

    result = []

    for i in range(len(words)):
        # skip first word (name)
        if i == 0:
            continue

        word = words[i]

        # remove time words
        if word in ["tomorrow", "today", "next", "week"]:
            continue

        # remove helper words
        if word in remove_words:
            continue

        # remove adverbs like "urgently", "quickly"
        if word.endswith("ly"):
            continue

        result.append(word)

    return " ".join(result).capitalize()

           #SPLIT MULTIPLE TASKS 
def split_tasks(sentence):
    parts = sentence.replace(",", " and ").split(" and ")
    return [p.strip() for p in parts if p.strip()]

# -------- MAIN API --------
@app.post("/process")
def process(data: RequestData):

    text = data.transcript
    members = data.team_members

    #split transcript into sentences
    sentences = [s.strip() for s in text.split('.') if s.strip()]

    # summary
    summary = ". ".join(sentences[:2])

    tasks = []

    for s in sentences:
        sub_tasks = split_tasks(s)

        for part in sub_tasks:
            if "will" in part.lower() or "should" in part.lower() or "need to" in part.lower():

                assigned_to = None

                # assign based on name
                for m in members:
                    if m.lower() in part.lower():
                        assigned_to = m
                        break

                # fallback assignment
                if not assigned_to:
                    assigned_to = random.choice(members) if members else "Team"

                tasks.append({
                    "task": clean_task(part),
                    "assigned_to": assigned_to,
                    "deadline": get_deadline(part),
                    "priority": "High" if "urgent" in part.lower() else "Medium",
                    "status": "Pending"
                })

    #fallback if no tasks found
    if not tasks:
        tasks.append({
            "task": "Prepare report",
            "assigned_to": "Team",
            "deadline": get_deadline("tomorrow"),
            "priority": "Medium",
            "status": "Pending"
        })

    return {
        "summary": summary,
        "tasks": tasks
    }