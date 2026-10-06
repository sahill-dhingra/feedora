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

        if (
    !businessName ||
    typeof rating !== "number" ||
    rating < 1 ||
    rating > 5
) { 
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

IMPORTANT:
The selected liked items and improvement items are the ONLY specific experiences you are allowed to mention.

A missing item means you have NO information about that aspect of the customer's experience.

For example:
- If "Food" was not selected as something the customer liked, do NOT say the food was good, tasty, fresh, etc.
- If "Service" was not selected, do NOT say the service was friendly, quick, helpful, etc.
- If "Staff" was not selected, do NOT mention the staff.
- If "Ambience" was not selected, do NOT describe the atmosphere.
- If "Cleanliness" was not selected, do NOT say the place was clean.
- If "Value for money" was not selected, do NOT say it was affordable or worth the money.
- If "Waiting time" was not selected as an improvement, do NOT mention waiting time.
- Never infer a specific experience from the business category or rating alone.

Rules:
- Write in first person, as if the customer is writing the review.
- Use simple, everyday English.
- Keep the tone casual, genuine, and conversational.
- Do not sound like a professional writer, marketer, or advertisement.
- Avoid overly polished or fancy language.
- Do not invent facts, experiences, details, people, products, services, prices, or events.
- Do not assume what the customer experienced based on the business category.
- Do not add specific positive experiences unless they are supported by the selected liked items.
- Do not add specific negative experiences unless they are supported by the selected improvement items.
- Do not mention a specific business aspect unless it appears in the customer's selected options.
- Match the tone and sentiment to the customer's rating.

Rating rules:
- 5 stars: clearly positive.
- 4 stars: positive, while naturally mentioning an improvement if one was provided.
- 3 stars: balanced and honest.
- 2 stars: mostly negative, while acknowledging positive points if provided.
- 1 star: clearly negative and focus on the provided problems.

Important cases:
- If liked is empty and issues is empty, write a general review based only on the rating. Do NOT mention food, service, staff, ambience, cleanliness, price, value, waiting time, or any other specific aspect.
- If liked is empty but issues contains items, mention only the provided improvement item(s). Do not invent positive experiences.
- If liked contains items but issues is empty, mention only the provided positive item(s). Do not invent problems.
- If both lists contain items, use only those items.

Writing style:
- Keep the review around 25–50 words.
- Usually write 2–4 sentences.
- Do not try to include every selected point.
- Only include points that fit naturally together.
- Do not repeat the same idea.
- Avoid words such as "thrilled", "impressed", "exceptional", "outstanding", "flawless", "seamless", "delighted", "remarkable", and "exceeded my expectations".
- Prefer simple words such as "good", "nice", "happy", "helpful", "great", "liked", and "overall".
- Do not intentionally add spelling mistakes, grammatical errors, slang, or other imperfections.
- Do not mention AI or that the review was generated.
- Do not use quotation marks.

Return ONLY the review text.
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
                    temperature: 0.4,
                    max_completion_tokens: 1024,
                    reasoning_effort: "low",
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
            console.error("Groq returned no review content:", {
                choices: groqData?.choices,
                usage: groqData?.usage,
                model: groqData?.model,
            });

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