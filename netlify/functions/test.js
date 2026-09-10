exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const topic = body.topic || "একটি মজার তথ্য";

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        input: `বাংলাদেশি TikTok audience-এর জন্য "${topic}" নিয়ে একটি ছোট viral-style Bangla video idea লিখো।`
      })
    });

    const data = await response.json();

    return {
      statusCode: response.ok ? 200 : response.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: response.ok,
        result: data.output_text || data
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
