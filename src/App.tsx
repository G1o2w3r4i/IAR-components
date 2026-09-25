import { useState } from 'react';
import { InputComponentsPreview } from './components/preview/InputComponentsPreview';
import { ButtonComponentsPreview } from './components/preview/ButtonComponentsPreview';

export function App() {
  const [activeTab, setActiveTab] = useState<'inputs' | 'buttons'>('buttons');

  return (
    <div>
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="flex gap-1 p-4">
          <button
            onClick={() => setActiveTab('buttons')}
            className={`px-6 py-2 font-semibold rounded transition-colors ${
              activeTab === 'buttons'
                ? 'bg-slate-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Buttons
          </button>
          <button
            onClick={() => setActiveTab('inputs')}
            className={`px-6 py-2 font-semibold rounded transition-colors ${
              activeTab === 'inputs'
                ? 'bg-slate-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Inputs
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'buttons' ? <ButtonComponentsPreview /> : <InputComponentsPreview />}
    </div>
  );
}

export default App;
