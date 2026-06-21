export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart
}) => {
  return `
You are a STRICT JSON GENERATOR for ExamMate.AI.

⚠️ ABSOLUTE RULES:
- Output MUST be ONLY valid JSON
- DO NOT write explanations, text, or markdown outside JSON
- NO extra keys allowed beyond schema
- NO trailing commas
- ONLY double quotes "
- Escape new lines as \\n
- NO emojis anywhere
- Response must be directly parsable using JSON.parse()

INPUT:
Topic: ${topic}
Class Level: ${classLevel || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revisionMode ? "ON" : "OFF"}
Include Diagram: ${includeDiagram ? "YES" : "NO"}
Include Charts: ${includeChart ? "YES" : "NO"}

CONTENT RULES:

1. REVISION MODE:
IF ON:
- Ultra short notes
- Only bullet points
- No explanations
- Exam cheat-sheet style

IF OFF:
- Short exam-focused explanation
- Max 2–4 lines per concept
- Simple language only

2. SUBTOPICS RULE:
Divide ALL content into:
- ⭐ Very Important
- ⭐⭐ Important
- ⭐⭐⭐ Frequently Asked

Each MUST be present (even if empty array)

3. DIAGRAM RULE:
IF includeDiagram = YES:
- diagram.data MUST be valid Mermaid
- Must start with graph TD
- Every node label inside [ ]
- No special characters

IF NO:
- diagram.data = ""

CHART RULES (RECHARTS):
- If INCLUDE CHARTS is YES:
  - charts array MUST NOT be empty
  - Generate at least ONE chart
  - Choose chart based on topic type:
    - THEORY topic → bar or pie (importance / weightage)
    - PROCESS topic → bar or line (steps / stages)
  - Use numeric values ONLY
  - Labels must be short and exam-oriented
- If INCLUDE CHARTS is NO:
  - charts MUST be []

CHART TYPES ALLOWED:
- bar
- line
- pie

CHART OBJECT FORMAT:
{
  "type": "bar | line | pie",
  "title": "string",
  "data": [
    { "name": "string", "value": 10 }
  ]
}

5. OUTPUT SCHEMA (STRICT - DO NOT CHANGE):

{
  "subTopics": {
    "⭐": [],
    "⭐⭐": [],
    "⭐⭐⭐": []
  },
  "notes": "string",
  "revisionPoints": [],
  "questions": {
    "short": [],
    "long": [],
    "diagram": []
  },
  "diagram": {
    "type": "flowchart",
    "data": ""
  },
  "charts": [
    {
      "type": "bar",
      "title": "string",
      "data": [
        { "name": "string", "value": 10 }
      ]
    }
  ]
}

FINAL RULE:
Return ONLY JSON. No extra text.
`;
};