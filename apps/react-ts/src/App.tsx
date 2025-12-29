import FilterDemo from "./demos/FilterDemo";
import SearchResultsDemo from "./demos/SearchResultsDemo";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 text-left">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <FilterDemo />

        <div className="min-w-0 flex-1">
          <div className="mx-auto max-w-3xl">
            <SearchResultsDemo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
