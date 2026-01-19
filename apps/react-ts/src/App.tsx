import FilterDemo from "./demos/FilterDemo";
import AIAnswerDemo from "./demos/AIAnswerDemo";
import SearchResultsDemo from "./demos/SearchResultsDemo";
import ChatMessageDemo from "./demos/ChatMessageDemo";
import MarkdownDemo from "./demos/MarkdownDemo";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 text-left">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <FilterDemo />

        <div className="min-w-0 flex-1">
          <div className="mx-auto max-w-3xl space-y-8">
            <ChatMessageDemo />
            <AIAnswerDemo />
            <SearchResultsDemo />
            <MarkdownDemo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
