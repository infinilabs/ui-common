import { useState } from 'react';
import { ChatMessage } from '@infinilabs/chatmessage';

const DEMO_USER_MESSAGE = {
    _id: 'msg_0',
    _source: {
        type: 'user',
        message: 'Hi there! What is Coco AI?'
    }
};

const DEMO_ASSISTANT_MESSAGE = {
  _id: 'msg_1',
  _source: {
    type: 'assistant',
    message: 'Coco AI is a powerful, open-source unified AI search tool.',
    details: [
        {
            type: 'query_intent',
            payload: {
                query: ['What is Coco AI?'],
                keyword: ['Coco AI'],
                suggestion: ['How to install?']
            }
        },
        {
            type: 'think',
            payload: {
                thought: 'Thinking about the answer...'
            }
        }
    ]
  }
};

export default function ChatMessageDemo() {
  const [locale, setLocale] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className={`p-4 border rounded-xl mb-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-bold mb-4">ChatMessage Component Demo</h2>
      
      <div className="mb-6 flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
            <span className="font-semibold">Locale:</span>
            <button 
                onClick={() => setLocale('en')} 
                className={`px-3 py-1 border rounded ${locale === 'en' ? 'bg-blue-500 text-white' : ''}`}
            >
                EN
            </button>
            <button 
                onClick={() => setLocale('zh')} 
                className={`px-3 py-1 border rounded ${locale === 'zh' ? 'bg-blue-500 text-white' : ''}`}
            >
                ZH
            </button>
        </div>

        <div className="flex items-center gap-2">
            <span className="font-semibold">Theme:</span>
            <button 
                onClick={() => setTheme('light')} 
                className={`px-3 py-1 border rounded ${theme === 'light' ? 'bg-blue-500 text-white' : ''}`}
            >
                Light
            </button>
            <button 
                onClick={() => setTheme('dark')} 
                className={`px-3 py-1 border rounded ${theme === 'dark' ? 'bg-blue-500 text-white' : ''}`}
            >
                Dark
            </button>
        </div>
      </div>

      <div className={`border rounded p-4 max-w-3xl mx-auto transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a] border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
        <ChatMessage 
            message={DEMO_USER_MESSAGE} 
            theme={theme}
            locale={locale}
        />
        <div className="h-4"></div>
        <ChatMessage 
            message={DEMO_ASSISTANT_MESSAGE} 
            theme={theme}
            locale={locale}
            think={{ chunk_type: 'think', message_chunk: 'Analyzing query...' }}
            query_intent={{ chunk_type: 'query_intent', message_chunk: 'Query Intent Analysis' }}
        />
      </div>
    </div>
  );
}
