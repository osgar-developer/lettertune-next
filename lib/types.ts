// Output schema matching the Python Pydantic model
export interface CoverLetterResponse {
  cover_letter: string
  key_matches: string[]
  style_notes: string
  suggested_subject?: string
}

// Input payload from the frontend
export interface GeneratePayload {
  model: string
  company_job_info: string
  applicant_background: string
  previous_cover_letter: string
  additional_instructions?: string
}

// Response from the API
export interface GenerateResponse extends CoverLetterResponse {
  model: string
  duration: number
  used: number
  limit: number
}

// Supported models
export type ModelId = 'llama' | 'granite' | 'mistral' | 'openai' | 'deepseek'

// Model configuration
export interface ModelConfig {
  id: ModelId
  name: string
  provider: 'watsonx' | 'openai' | 'deepseek'
  modelId: string
}
