import { speak } from 'tauri-plugin-tts-api';

export async function speakText(text: string, language: 'pl-PL' | 'en-US') {
  await speak({
    text,
    language,
    voiceId: null,
    rate: null,
    pitch: null,
    volume: null,
    queueMode: 'flush',
  });
}
