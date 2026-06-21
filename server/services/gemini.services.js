const Gemini_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export const generateGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(
      `${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Gemini API Error: ${err}`);
    }

    const data = await response.json();

    let text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {

      console.log("Invalid JSON:", text);

      const match = text.match(/\{[\s\S]*\}/);

      if (!match) {
        throw new Error("Gemini returned invalid JSON");
      }

      parsed = JSON.parse(match[0]);
    }

    return parsed;

  } catch (error) {
    console.error("Gemini Fetch Error:", error.message);
    throw new Error("Gemini API fetch failed");
  }
};