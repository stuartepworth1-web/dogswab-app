import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isListening?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, isListening = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsRecording(true);
      };

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
        
        if (finalTranscript) {
          onTranscript(finalTranscript);
        }
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      recognitionInstance.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setPermissionDenied(true);
        } else {
          console.error('Speech recognition error:', event.error);
        }
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onTranscript]);

  const startRecording = () => {
    if (recognition && !isRecording && !permissionDenied) {
      setTranscript('');
      setPermissionDenied(false);
      try {
        // Request microphone permission first
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(() => {
            recognition.start();
          })
          .catch((error) => {
            console.error('Microphone permission denied:', error);
            setPermissionDenied(true);
          });
      } catch (error) {
        console.error('Speech recognition start error:', error);
        setPermissionDenied(true);
      }
    }
  };

  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Text-to-speech for AI responses
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!recognition) {
    return null; // Don't render if speech recognition is not supported
  }

  return (
    <div className="flex items-center space-x-1">
      {/* Permission denied message */}
      {permissionDenied && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-red-50 border border-red-200 rounded-xl shadow-xl">
          <p className="text-sm text-red-700 font-medium">
            🎤 Microphone access required for voice input. Please enable microphone permissions in your browser settings.
          </p>
        </div>
      )}

      {/* Voice Input Button */}
      <button
        onClick={toggleRecording}
        disabled={permissionDenied}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isRecording 
            ? 'bg-red-500 text-white animate-pulse shadow-lg hover:scale-105' 
            : permissionDenied 
              ? 'glass-card text-gray-400 cursor-not-allowed opacity-50'
              : 'glass-card text-dogswab-navy hover:bg-dogswab-mint/20 shadow-sm hover:scale-105'
        }`}
        title={isRecording ? 'Stop recording' : 'Start voice input'}
      >
        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>

      {/* Text-to-Speech Button */}
      <button
        onClick={() => speakText('Hello! I\'m your AI pet health assistant. How can I help you today?')}
        className="w-10 h-10 rounded-full glass-card text-dogswab-navy hover:bg-dogswab-mint/20 shadow-sm flex items-center justify-center transition-all hover:scale-105"
        title="Hear AI introduction"
      >
        <Volume2 className="w-4 h-4" />
      </button>

      {/* Recording indicator */}
      {isRecording && (
        <div className="flex items-center space-x-2 px-3 py-2 bg-red-100 rounded-full shadow-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <span className="text-sm text-red-700 font-semibold hidden sm:inline">Listening</span>
        </div>
      )}

      {/* Live transcript */}
      {transcript && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-3 glass-card rounded-xl shadow-xl border border-white/30">
          <p className="text-sm text-dogswab-navy font-medium">{transcript}</p>
        </div>
      )}
    </div>
  );
};