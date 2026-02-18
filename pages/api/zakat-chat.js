export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {

    const message = String(req.body?.message || "");

    if (!message || message.trim() === "") {
      return res.status(400).json({
        reply: "Message is required"
      });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
            {
            role: "system",
            content: `
                You are an Islamic Zakat assistant following Hanafi fiqh.

                Rules:
                - Answer clearly and briefly
                - Use simple language
                - Be polite and helpful

                IMPORTANT INSTRUCTIONS:

                If user wants to calculate zakat OR mentions:
                "calculate", "how much zakat", "my zakat", "zakat on", "how to calculate"

                THEN add this line at end:
                "You can calculate your exact Zakat here: https://zakat-calculator-psi.vercel.app/calculator"

                If user reports bug OR gives feedback OR mentions:
                "bug", "issue", "problem", "feedback", "error", "not working"

                THEN add this line at end:
                "Please report it here: https://zakat-calculator-psi.vercel.app/feedback"

                Never add links unless relevant.
                Keep answer short.
                `
            },
            {
            role: "user",
            content: message
            }
        ]
        })

    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        reply: data.error?.message || "Groq API error"
      });
    }

    return res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      reply: "Server error"
    });

  }
}
