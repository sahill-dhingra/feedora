import { corsHeaders } from "npm:@supabase/supabase-js@^2/cors";

Deno.serve(async (req: Request) => {
    // Handle browser CORS preflight request
    if (req.method === "OPTIONS") {
        return new Response("ok", {
            headers: corsHeaders,
        });
    }

    try {
        const {
            businessName,
            category,
            rating,
            liked,
            issues,
        } = await req.json();

        if (!businessName || !rating) {
            return new Response(
                JSON.stringify({
                    error: "businessName and rating are required",
                }),
                {
                    status: 400,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const groqApiKey = Deno.env.get("GROQ_API_KEY");

        if (!groqApiKey) {
            throw new Error("GROQ_API_KEY is not configured");
        }

        const prompt = `
Write a short, natural Google review based ONLY on the customer's information provided below.

Business name: ${businessName}
Business category: ${category || "business"}
Rating: ${rating}/5
Things the customer liked: ${
    liked?.length ? liked.join(", ") : "None provided"
}
Things the customer felt could be improved: ${
    issues?.length ? issues.join(", ") : "None provided"
}

Rules:
- Write in first person, as if the customer is writing the review.
- Use simple, everyday English that a normal customer would naturally use.
- Keep the tone casual, genuine, and conversational.
- Do not sound like a professional writer, marketer, or advertisement.
- Avoid overly polished or fancy language.
- Avoid words such as "thrilled", "impressed", "exceptional", "outstanding", "flawless", "seamless", "delighted", "remarkable", and "exceeded my expectations".
- Prefer simple words such as "good", "nice", "happy", "helpful", "great", "liked", and "overall".
- Keep the review around 25–50 words.
- Usually write 2–4 sentences.
- Do not make the review unnecessarily detailed.
- Do not try to include every selected point. Only include points that fit naturally together.
- Do not repeat the same idea in different ways.
- Match the tone and sentiment to the customer's rating.
- For a 5-star rating, make the review clearly positive and satisfied.
- For a 4-star rating, make it positive while naturally mentioning any improvement points provided.
- For a 3-star rating, keep the review balanced and honest.
- For a 2-star rating, make the review mostly negative while acknowledging positive points if provided.
- For a 1-star rating, make the review clearly negative and focus on the problems provided.
- If the customer did not provide a positive point, do not invent one.
- If the customer did not provide an improvement point, do not invent one.
- Do not invent facts, people, products, prices, events, services, or experiences.
- Do not add details about the business that the customer did not provide.
- Do not exaggerate the customer's experience.
- Do not intentionally add spelling mistakes, grammatical errors, slang, or other imperfections to make the review appear human.
- Do not mention AI or that the review was generated.
- Do not use quotation marks.
- Return ONLY the review text.
`;

        const groqResponse = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${groqApiKey}`,
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-20b",
                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                    temperature: 0.7,
                    max_completion_tokens: 512,
                    include_reasoning: false,
                }),
            }
        );

        if (!groqResponse.ok) {
            const errorText = await groqResponse.text();

            console.error("Groq API error:", errorText);

            return new Response(
                JSON.stringify({
                    error: "Failed to generate review",
                }),
                {
                    status: 500,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const groqData = await groqResponse.json();

        const review =
            groqData.choices?.[0]?.message?.content?.trim();

        if (!review) {
            throw new Error("Groq returned an empty review");
        }

        return new Response(
            JSON.stringify({
                success: true,
                review,
            }),
            {
                status: 200,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Function error:", error);

        return new Response(
            JSON.stringify({
                error: "Something went wrong while generating the review",
            }),
            {
                status: 500,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            }
        );
    }
});