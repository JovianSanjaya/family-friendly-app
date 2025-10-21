'use client';

import { useState, useEffect } from 'react';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
}

export default function VoiceInput({ onTranscript }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if Web Speech API is supported
    if (typeof window !== 'undefined') {
      setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
    }
  }, []);

  const startListening = () => {
    if (!isSupported) {
      alert('Sorry, your browser doesn\'t support voice recognition. Please try Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'no-speech') {
        alert('No speech detected. Please try again.');
      } else if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone access in your browser settings.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={startListening}
      disabled={isListening}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-medium transition-all duration-300 ${
        isListening
          ? 'bg-red-500 border-red-500 text-white animate-pulse'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-pink-50 hover:border-pink-300'
      }`}
    >
      <span className="text-xl">{isListening ? '🔴' : '🎤'}</span>
      <span>{isListening ? 'Listening...' : 'Voice'}</span>
    </button>
  );
}
