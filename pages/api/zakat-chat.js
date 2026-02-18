export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {

    const message = String(req.body?.message || "");

    if (!message || message.trim() === "") {
      return res.status(400).json({
        reply: "Please ask a valid Zakat question."
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
              You are a STRICT Islamic Zakat assistant following Hanafi fiqh.

              Your purpose is to help Muslims understand Zakat correctly.

              CORE SHARIA RULES (Hanafi fiqh):

              - Cash, bank balance, savings, and digital money are ALWAYS zakatable if above Nisab and held for 1 lunar year.
              - Money saved for house, marriage, car, business, or any future purpose is STILL zakatable.
              - Gold and silver are ALWAYS zakatable if above Nisab.
              - Personal residence (house you live in), personal car, clothes, and personal items are NOT zakatable.
              - Investment assets, business goods, and trade inventory are zakatable.
              - Zakat rate is 2.5%.
              - Nisab is based on silver value (87.48 grams silver).
              - If Nisab and 1 lunar year (Hawl) are completed, Zakat becomes obligatory.
              - Debts you owe can be deducted from zakatable assets.

              RESPONSE STYLE:

              - Answer clearly and briefly
              - Use simple language
              - Be polite and helpful
              - Do NOT guess or invent rulings
              - If unsure, advise consulting a qualified Islamic scholar
              - Never give incorrect exemptions for savings, gold, or cash

              CALCULATOR INSTRUCTION:

              If user wants to calculate zakat OR mentions words like:
              "calculate", "how much zakat", "my zakat", "zakat on", "how to calculate", "how much"

              THEN add this line at the end:
              "You can calculate your exact Zakat here: https://zakat-calculator-psi.vercel.app/calculator"

              FEEDBACK / BUG INSTRUCTION:

              If user reports bug OR mentions:
              "bug", "issue", "problem", "feedback", "error", "not working"

              THEN add this line at the end:
              "Please report it here: https://zakat-calculator-psi.vercel.app/feedback"

              IMPORTANT:

              - Do NOT say savings are exempt from zakat
              - Do NOT give wrong rulings
              - Only answer Zakat-related questions
              - Keep answers short (2–5 sentences max)
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
