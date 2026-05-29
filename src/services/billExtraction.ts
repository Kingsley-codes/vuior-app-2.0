export type ExtractedBillFields = {
  name?: string;
  amount?: string;
  accountNumber?: string;
  dueDate?: string;
};

/**
 * Uses OpenAI vision (same idea as web bill form). Requires EXPO_PUBLIC_OPENAI_API_KEY.
 * PDFs are not supported here—use a photo of the bill for extraction.
 */
export async function extractBillFromImageDataUrl(
  dataUrl: string
): Promise<ExtractedBillFields> {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing EXPO_PUBLIC_OPENAI_API_KEY");
  }

  const prompt =
    "Extract from this bill or invoice: service provider name, total amount due, account number, and due date. " +
    "Respond with ONLY a compact JSON object with keys: name, amount, accountNumber, dueDate. " +
    "amount should be a numeric string without currency symbols. dueDate as YYYY-MM-DD if possible.";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText.slice(0, 200) || "OpenAI request failed");
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const raw = data.choices?.[0]?.message?.content?.trim() || "";
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return {};
  try {
    return JSON.parse(match[0]) as ExtractedBillFields;
  } catch {
    return {};
  }
}
