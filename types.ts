export interface UploadedImage {
  file: File;
  previewUrl: string;
  base64: string; // Raw base64 string without data prefix
  mimeType: string;
}

export interface GenerationState {
  isGenerating: boolean;
  resultImage?: string; // Data URL of the result
  error?: string;
}

export const DEFAULT_PROMPT = "Turn this person into a 90s retro-Inspired portrait wearing a shimmering black chiffon saree. The background is a deep wall with dramatic shadows, lit by golden-hour tones. Expression is calm yet mysterious, evoking old Bollywood posters.";
