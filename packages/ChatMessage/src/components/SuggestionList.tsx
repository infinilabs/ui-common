import { MoveRight } from "lucide-react";

interface SuggestionListProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestionList({ suggestions, onSelect }: SuggestionListProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="text-left inline-flex items-center px-3 py-1.5 rounded-full bg-[#F5F5F5] dark:bg-[#2A2A2A] border border-[#E4E5EF] dark:border-[#3A3A3A] text-sm text-[#333333] dark:text-white hover:bg-[#EDEDED] dark:hover:bg-[#3A3A3A] transition-colors w-fit max-w-full wrap-break-word whitespace-pre-wrap"
        >
          <span className="break-all">{suggestion}</span>
          <MoveRight className="w-3 h-3 ml-1.5 shrink-0" />
        </button>
      ))}
    </div>
  );
}
