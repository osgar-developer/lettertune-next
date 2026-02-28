import { CoverLetterResponse, GeneratePayload } from './types'

// System prompt (matching the Python version)
const SYSTEM_PROMPT = `You are LetterTune, an assistant that writes highly personalized cover letters.

Goals:
- Use the COMPANY + JOB info to understand the role, responsibilities, and requirements.
- Use the APPLICANT BACKGROUND/RESUME to select relevant experiences, skills, achievements, and keywords.
- Mimic the LANGUAGE STYLE of the APPLICANT'S PREVIOUS COVER LETTER (tone, phrasing, sentence length, structure, formality, personality).
- Do NOT copy content verbatim from the previous letter if it doesn't fit; mimic style, not facts.
- Keep it truthful: only claim what is supported by the applicant background.
- Output MUST follow the JSON schema exactly.

Quality requirements:
- Make the letter sound human, specific, and not generic.
- Prefer concrete details (projects, metrics, tools, outcomes) when available.
- If something is missing, make a reasonable neutral statement rather than inventing specifics.`

// JSON schema instructions for the AI
const JSON_SCHEMA_INSTRUCTIONS = `Output a valid JSON object with this exact schema:
{
  "cover_letter": "The final cover letter text, ready to copy/paste.",
  "key_matches": ["bullet list of strongest matches between job requirements and applicant background"],
  "style_notes": "Short notes describing the writing style you imitated",
  "suggested_subject": "Optional email subject line"
}`

// Build the user prompt
function buildUserPrompt(payload: GeneratePayload): string {
  return `COMPANY + JOB OFFER INFO:
${payload.company_job_info}

APPLICANT BACKGROUND / RESUME:
${payload.applicant_background}

APPLICANT'S PREVIOUS COVER LETTER (STYLE, GRAMMAR and SPELLING REFERENCE):
${payload.previous_cover_letter}

ADDITIONAL INSTRUCTIONS (optional):
${payload.additional_instructions || '(none)'}

Write a cover letter tailored to the job and company, using the applicant's background,
in the same language style as the previous cover letter.`
}

// Watsonx API configuration
const WATSONX_CONFIG = {
  url: 'https://eu-de.ml.cloud.ibm.com',
  projectId: 'c61b10b6-b6f7-474a-8641-34cc9f57f9c8',
  modelIds: {
    llama: 'meta-llama/llama-3-2-11b-vision-instruct',
    granite: 'ibm/granite-4-h-small',
    mistral: 'mistralai/mistral-small-3-1-24b-instruct-2503',
  },
}

// Get IBM IAM token
async function getIBMToken(apiKey: string): Promise<string> {
  const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
  })

  if (!response.ok) {
    throw new Error(`Failed to get IBM token: ${response.status}`)
  }

  const data = await response.json()
  return data.access_token
}

// Call Watsonx API
async function callWatsonx(
  apiKey: string,
  modelId: string,
  systemPrompt: string,
  userPrompt: string
): Promise<CoverLetterResponse> {
  // Get IAM token first
  const token = await getIBMToken(apiKey)

  const response = await fetch(`${WATSONX_CONFIG.url}/ml/v1/text/generation?version=2024-05-01`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      project_id: WATSONX_CONFIG.projectId,
      model_id: modelId,
      input: `${systemPrompt}\n\n${JSON_SCHEMA_INSTRUCTIONS}\n\n${userPrompt}`,
      parameters: {
        decoding_method: 'greedy',
        max_new_tokens: 356,
        temperature: 0.7,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Watsonx API error: ${error}`)
  }

  const data = await response.json()
  console.log('Watsonx response:', JSON.stringify(data, null, 2))
  
  const generatedText = data.results?.[0]?.generated_text || ''

  if (!generatedText) {
    throw new Error('Watsonx returned empty response')
  }

  // Try to extract JSON from the response
  // Handle cases where response includes text before the JSON
  function extractJSON(text: string): CoverLetterResponse {
    // Try direct parse first
    try {
      return JSON.parse(text)
    } catch {
      // Try to find JSON in markdown code blocks
      const codeBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
      if (codeBlockMatch) {
        try {
          return JSON.parse(codeBlockMatch[1])
        } catch {
          // Continue to next method
        }
      }
      
      // Find the first { that starts a valid JSON object
      // Look for "{" and try to parse from there
      const firstBrace = text.indexOf('{')
      if (firstBrace !== -1) {
        const jsonPart = text.substring(firstBrace)
        try {
          return JSON.parse(jsonPart)
        } catch {
          // Try to find the closing brace
          const lastBrace = jsonPart.lastIndexOf('}')
          if (lastBrace !== -1) {
            const trimmedJson = jsonPart.substring(0, lastBrace + 1)
            try {
              return JSON.parse(trimmedJson)
            } catch {
              throw new Error(`Failed to parse AI response as JSON. Response: ${text.substring(0, 500)}`)
            }
          }
        }
      }
      throw new Error(`Failed to parse AI response as JSON. Response: ${text.substring(0, 500)}`)
    }
  }
  
  return extractJSON(generatedText)
}

// Call OpenAI API
async function callOpenAI(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string
): Promise<CoverLetterResponse> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt + '\n\n' + JSON_SCHEMA_INSTRUCTIONS },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI API error: ${error}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content || ''

  if (!content) {
    throw new Error('OpenAI returned empty response')
  }

  // Try to extract JSON from the response
  function extractJSON(text: string): CoverLetterResponse {
    try {
      return JSON.parse(text)
    } catch {
      const codeBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
      if (codeBlockMatch) {
        try {
          return JSON.parse(codeBlockMatch[1])
        } catch { }
      }
      // Find first { and try parsing from there
      const firstBrace = text.indexOf('{')
      if (firstBrace !== -1) {
        const jsonPart = text.substring(firstBrace)
        try {
          return JSON.parse(jsonPart)
        } catch {
          const lastBrace = jsonPart.lastIndexOf('}')
          if (lastBrace !== -1) {
            try {
              return JSON.parse(jsonPart.substring(0, lastBrace + 1))
            } catch { }
          }
        }
      }
      throw new Error(`Failed to parse AI response as JSON. Response: ${text.substring(0, 500)}`)
    }
  }
  
  return extractJSON(content)
}

// Call DeepSeek API (OpenAI-compatible)
async function callDeepSeek(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string
): Promise<CoverLetterResponse> {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt + '\n\n' + JSON_SCHEMA_INSTRUCTIONS },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`DeepSeek API error: ${error}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content || ''

  if (!content) {
    throw new Error('DeepSeek returned empty response')
  }

  // Try to extract JSON from the response
  function extractJSON(text: string): CoverLetterResponse {
    try {
      return JSON.parse(text)
    } catch {
      const codeBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
      if (codeBlockMatch) {
        try {
          return JSON.parse(codeBlockMatch[1])
        } catch { }
      }
      // Find first { and try parsing from there
      const firstBrace = text.indexOf('{')
      if (firstBrace !== -1) {
        const jsonPart = text.substring(firstBrace)
        try {
          return JSON.parse(jsonPart)
        } catch {
          const lastBrace = jsonPart.lastIndexOf('}')
          if (lastBrace !== -1) {
            try {
              return JSON.parse(jsonPart.substring(0, lastBrace + 1))
            } catch { }
          }
        }
      }
      throw new Error(`Failed to parse AI response as JSON. Response: ${text.substring(0, 500)}`)
    }
  }
  
  return extractJSON(content)
}

// Main generate function
export async function generateCoverLetter(
  payload: GeneratePayload,
  env: {
    WATSONX_CREDENTIALS?: string
    OPENAI_API_KEY?: string
    DEEPSEEK_API_KEY?: string
  }
): Promise<CoverLetterResponse> {
  const { model } = payload
  const userPrompt = buildUserPrompt(payload)

  switch (model) {
    case 'llama':
    case 'granite':
    case 'mistral': {
      if (!env.WATSONX_CREDENTIALS) {
        throw new Error('WATSONX_CREDENTIALS is not configured')
      }
      const modelId = WATSONX_CONFIG.modelIds[model as keyof typeof WATSONX_CONFIG.modelIds]
      return callWatsonx(env.WATSONX_CREDENTIALS, modelId, SYSTEM_PROMPT, userPrompt)
    }

    case 'openai': {
      if (!env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not configured')
      }
      return callOpenAI(env.OPENAI_API_KEY, 'gpt-4o-mini', SYSTEM_PROMPT, userPrompt)
    }

    case 'deepseek': {
      if (!env.DEEPSEEK_API_KEY) {
        throw new Error('DEEPSEEK_API_KEY is not configured')
      }
      return callDeepSeek(env.DEEPSEEK_API_KEY, SYSTEM_PROMPT, userPrompt)
    }

    default:
      throw new Error(`Unknown model: ${model}`)
  }
}
