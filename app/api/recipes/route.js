import { NextResponse } from "next/server";

export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured. Add it to your Vercel environment variables." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { inventory, modes } = body;
  if (!inventory) {
    return NextResponse.json({ error: "inventory is required" }, { status: 400 });
  }

  const invText = Object.entries(inventory)
    .map(([cat, items]) => `${cat.toUpperCase()}: ${items.map((i) => i.name).join(", ")}`)
    .join("\n");

  const modeLabels = (modes || []).join(", ") || "quick, comforting, gluten-free";

  const prompt = `You are a warm, practical home-cooking assistant. A woman just had a long, tiring day and needs dinner. She has a gluten intolerance — every recipe MUST be 100% gluten-free, no exceptions.

HER INVENTORY:
${invText}

Tonight's priorities: ${modeLabels}.

Suggest exactly 3 recipes using what she already has. Return ONLY a raw JSON array — no markdown, no backticks, no explanation, nothing before or after the array:
[{"name":"...","time":"...","difficulty":"...","comfort":"...","description":"...","uses":["..."],"needs":[]},...]

Rules:
- "needs" should be empty or have at most 1–2 simple items
- Prioritize fridge items: GF bread (expiring soon), milk, butter, egg
- Instant mashed potatoes are a perfectly valid and comforting shortcut
- Make each recipe feel different in technique and mood
- Descriptions should be warm and specific — this is a reward after a long day`;

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok || data.error) {
      return NextResponse.json(
        { error: data?.error?.message || `Anthropic API error: ${anthropicRes.status}` },
        { status: 502 }
      );
    }

    const raw = (data.content || [])
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();

    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();

    let recipes;
    try {
      recipes = JSON.parse(cleaned);
    } catch {
      const match = cleaned.match(/\[[\s\S]*\]/);
      if (match) {
        recipes = JSON.parse(match[0]);
      } else {
        return NextResponse.json(
          { error: `Could not parse Anthropic response: ${raw.slice(0, 300)}` },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ recipes: Array.isArray(recipes) ? recipes : [recipes] });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}
