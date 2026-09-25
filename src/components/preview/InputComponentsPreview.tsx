import React, { useState } from 'react';
import {
  SharedTextInput,
  SharedSelect,
  SharedMultiSelect,
  SharedRadioGroup,
  SharedAutocomplete,
  SharedSearchInput,
  SharedTextArea,
  SharedButton,
} from '@/components/shared';
import type { SelectOption, RadioOption } from '@/components/shared';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import AutocompleteIcon from '@mui/icons-material/FindInPage';
import SearchIcon from '@mui/icons-material/Search';
import NotesIcon from '@mui/icons-material/Notes';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import SendIcon from '@mui/icons-material/Send';

// Mock Options for Enterprise Demonstration
const AUDIT_TYPE_OPTIONS: SelectOption[] = [
  { value: 'integrated', label: 'Integrated Audit' },
  { value: 'financial', label: 'Financial Audit' },
  { value: 'operational', label: 'Operational Audit' },
  { value: 'compliance', label: 'Compliance Audit' },
  { value: 'it', label: 'IT & Cyber Audit' },
];

const AUDIT_FUNCTION_OPTIONS: SelectOption[] = [
  { value: 'finance', label: 'Global Finance' },
  { value: 'tech', label: 'Technology & Digital' },
  { value: 'supply_chain', label: 'Global Supply Chain' },
  { value: 'hr', label: 'Human Capital' },
  { value: 'risk', label: 'Enterprise Risk Management' },
];

const MAIN_DRIVER_OPTIONS: SelectOption[] = [
  { value: 'regulatory', label: 'Regulatory Mandate' },
  { value: 'risk_assessment', label: 'Annual Risk Assessment' },
  { value: 'management_request', label: 'Executive Request' },
  { value: 'whistleblower', label: 'Special Investigation' },
];

const QUARTER_OPTIONS: RadioOption[] = [
  { value: 'Q1', label: 'Q1' },
  { value: 'Q2', label: 'Q2' },
  { value: 'Q3', label: 'Q3' },
  { value: 'Q4', label: 'Q4' },
];

const L2_RISK_OPTIONS: SelectOption[] = [
  { value: 'cyber_security', label: 'Cyber Security & Privacy' },
  { value: 'regulatory_compliance', label: 'Regulatory Compliance' },
  { value: 'third_party', label: 'Third-Party / Vendor Risk' },
  { value: 'business_continuity', label: 'Business Continuity' },
  { value: 'fraud_bribery', label: 'Anti-Bribery & Corruption' },
  { value: 'market_conduct', label: 'Market Conduct' },
];

interface UserApprover {
  id: string;
  name: string;
  title: string;
  department: string;
}

const APPROVER_OPTIONS: UserApprover[] = [
  { id: '1', name: 'Sarah Jenkins (SALT)', title: 'Audit Director', department: 'Global Assurance' },
  { id: '2', name: 'Marcus Vance (ALT)', title: 'Senior Audit Lead', department: 'Tech Audit' },
  { id: '3', name: 'Elena Rostova (SALT)', title: 'VP Risk & Audit', department: 'Enterprise Risk' },
  { id: '4', name: 'David Chen (ALT)', title: 'Audit Manager', department: 'Financial Controls' },
  { id: '5', name: 'Amina Patel (ALT)', title: 'Lead Compliance Officer', department: 'Ethics' },
];

type TabKey = 'reference' | 'text' | 'select' | 'multiselect' | 'radio' | 'autocomplete' | 'search' | 'textarea' | 'button';

interface NavItem {
  id: TabKey;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const InputComponentsPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('reference');

  // ==========================================
  // Reference Form Modal State (Visual Match)
  // ==========================================
  const [refAuditName, setRefAuditName] = useState('');
  const [refAuditType, setRefAuditType] = useState('');
  const [refAuditFunction, setRefAuditFunction] = useState('');
  const [refMainDriver, setRefMainDriver] = useState('');
  const [refQuarter, setRefQuarter] = useState('Q1');
  const [refRisks, setRefRisks] = useState<string[]>([]);
  const [refApprover, setRefApprover] = useState<UserApprover | null>(null);
  const [refApproverInput, setRefApproverInput] = useState('');
  const [refEntitySearch, setRefEntitySearch] = useState('');
  const [refFormSubmitted, setRefFormSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // ==========================================
  // Interactive Playground Global State
  // ==========================================
  const [playRequired, setPlayRequired] = useState(true);
  const [playError, setPlayError] = useState(false);
  const [playDisabled, setPlayDisabled] = useState(false);
  const [playReadOnly, setPlayReadOnly] = useState(false);
  const [playLoading, setPlayLoading] = useState(false);
  const [playSize, setPlaySize] = useState<'small' | 'medium'>('small');

  // Specific state for single component showcases
  const [demoTextVal, setDemoTextVal] = useState('SOX Compliance Review 2026');
  const [demoSelectVal, setDemoSelectVal] = useState('financial');
  const [demoMultiVal, setDemoMultiVal] = useState<string[]>(['cyber_security', 'third_party']);
  const [demoRadioVal, setDemoRadioVal] = useState('Q2');
  const [demoAutoVal, setDemoAutoVal] = useState<UserApprover | null>(APPROVER_OPTIONS[0]);
  const [demoAutoInput, setDemoAutoInput] = useState('');
  const [demoSearchVal, setDemoSearchVal] = useState('Treasury Holdings Corp');
  const [lastSearchResult, setLastSearchResult] = useState<string>('Treasury Holdings Corp');

  // ---- NEW: TextArea demo state ----
  const [demoTextAreaVal, setDemoTextAreaVal] = useState(
    'This audit will evaluate the effectiveness of financial controls across the treasury and payments function, with specific focus on reconciliation processes and segregation of duties.'
  );

  // ---- NEW: Button demo state ----
  const [btnLoading, setBtnLoading] = useState(false);
  const simulateLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  // ---- NEW: Reference form Reason field ----
  const [refReason, setRefReason] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navItems: NavItem[] = [
    { id: 'reference', label: 'Reference Form Match', icon: ViewQuiltIcon, badge: 'Target UI' },
    { id: 'text', label: 'SharedTextInput', icon: TextFieldsIcon },
    { id: 'select', label: 'SharedSelect', icon: ArrowDropDownCircleIcon },
    { id: 'multiselect', label: 'SharedMultiSelect', icon: CheckBoxIcon },
    { id: 'radio', label: 'SharedRadioGroup', icon: RadioButtonCheckedIcon },
    { id: 'autocomplete', label: 'SharedAutocomplete', icon: AutocompleteIcon },
    { id: 'search', label: 'SharedSearchInput', icon: SearchIcon },
    { id: 'textarea', label: 'SharedTextArea', icon: NotesIcon, badge: 'New' },
    { id: 'button', label: 'SharedButton', icon: SmartButtonIcon, badge: 'New' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-inner">
            UI
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Power Apps Shared Input Library
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                MUI + Tailwind CSS
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Enterprise controlled components reverse-engineered from &quot;Add New Audit&quot; reference
            </p>
          </div>
        </div>

        {/* Global Playground Switcher */}
        <div className="flex items-center flex-wrap gap-2 text-xs bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
          <span className="text-slate-400 font-semibold px-2 uppercase text-[10px] tracking-wider">
            Live Props:
          </span>
          <button
            onClick={() => setPlayRequired(!playRequired)}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              playRequired ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Required {playRequired ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => setPlayError(!playError)}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              playError ? 'bg-red-500 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Error {playError ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => setPlayDisabled(!playDisabled)}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              playDisabled ? 'bg-slate-300 text-slate-900 font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Disabled {playDisabled ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => setPlayReadOnly(!playReadOnly)}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              playReadOnly ? 'bg-purple-500 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            ReadOnly {playReadOnly ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => setPlayLoading(!playLoading)}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              playLoading ? 'bg-blue-500 text-white font-bold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Loading {playLoading ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => setPlaySize(playSize === 'small' ? 'medium' : 'small')}
            className="px-2.5 py-1 rounded bg-slate-700 text-slate-200 hover:bg-slate-600 font-medium"
          >
            Size: <span className="font-bold text-white">{playSize}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 p-4 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
            Component Showcase
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200/60 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`!w-4 !h-4 ${
                      isActive ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-6 px-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
              <p className="font-semibold text-slate-700 flex items-center gap-1.5">
                <CheckCircleOutlinedIcon className="!w-4 !h-4 text-emerald-600" />
                Pure Controlled Architecture
              </p>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Parent owns state. Business logic and backend calls are decoupled from inputs.
              </p>
            </div>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl mx-auto w-full">
          {/* ========================================================
              TAB 1: REFERENCE FORM PREVIEW (EXACT VISUAL RECREATION)
              ======================================================== */}
          {activeTab === 'reference' && (
            <div className="space-y-6">
              {/* Context Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide">
                    Reference Form Verification: &quot;Add New Audit&quot;
                  </h2>
                  <p className="text-xs text-blue-700 mt-1">
                    This screen recreates the exact form layout and control styling from the user&apos;s reference screenshot using only our reusable shared components.
                  </p>
                </div>
                <span className="bg-blue-200/70 text-blue-900 text-xs px-2.5 py-1 rounded font-semibold shrink-0">
                  Visual Fidelity Check
                </span>
              </div>

              {/* Modal Window Recreation */}
              <div className="bg-white rounded-lg shadow-xl border border-slate-300 overflow-hidden max-w-4xl mx-auto">
                {/* Modal Title Bar */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-800 tracking-tight">
                    Add New Audit
                  </h2>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                    aria-label="Close dialog"
                  >
                    <CloseIcon className="!w-5 !h-5" />
                  </button>
                </div>

                {/* Lavender/Tinted Notice Area from Reference Screenshot */}
                <div className="px-6 pt-4 pb-2">
                  <div className="w-full h-14 bg-indigo-50/60 rounded border border-indigo-100/80 flex items-center px-4 text-xs text-indigo-900/80">
                    <span className="font-medium">
                      Audit Scope & Governance Details &bull; Complete all required parameters marked with an asterisk (*).
                    </span>
                  </div>
                </div>

                {/* Form Body with Reusable Shared Controls */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRefFormSubmitted(true);
                  }}
                  className="p-6 space-y-4"
                >
                  {/* Field 1: Audit Name */}
                  <SharedTextInput
                    label="Audit Name"
                    required
                    value={refAuditName}
                    onChange={setRefAuditName}
                    placeholder="Enter audit name"
                    error={refFormSubmitted && !refAuditName}
                    errorMessage="Audit Name is required."
                  />

                  {/* Field 2, 3, 4: Three Column Selects */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SharedSelect
                      label="Audit Type"
                      required
                      value={refAuditType}
                      onChange={setRefAuditType}
                      options={AUDIT_TYPE_OPTIONS}
                      placeholder="Select One"
                      error={refFormSubmitted && !refAuditType}
                      errorMessage="Please select an audit type."
                    />

                    <SharedSelect
                      label="Audit Function"
                      required
                      value={refAuditFunction}
                      onChange={setRefAuditFunction}
                      options={AUDIT_FUNCTION_OPTIONS}
                      placeholder="Select One"
                      error={refFormSubmitted && !refAuditFunction}
                      errorMessage="Please select an audit function."
                    />

                    <SharedSelect
                      label="Main Driver"
                      required
                      value={refMainDriver}
                      onChange={setRefMainDriver}
                      options={MAIN_DRIVER_OPTIONS}
                      placeholder="Select One"
                      error={refFormSubmitted && !refMainDriver}
                      errorMessage="Please select a main driver."
                    />
                  </div>

                  {/* Field 5 & 6: Planned Quarter and In Scope L2 Risks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <SharedRadioGroup
                      label="Planned Quarter"
                      required
                      value={refQuarter}
                      onChange={setRefQuarter}
                      options={QUARTER_OPTIONS}
                      direction="row"
                    />

                    <SharedMultiSelect
                      label="In Scope L2 Risks"
                      required
                      value={refRisks}
                      onChange={setRefRisks}
                      options={L2_RISK_OPTIONS}
                      placeholder="Select risks"
                      accentArrow={true}
                      error={refFormSubmitted && refRisks.length === 0}
                      errorMessage="Select at least one risk category."
                    />
                  </div>

                  {/* Field 7: Add Approver */}
                  <SharedAutocomplete<UserApprover>
                    label="Add Approver"
                    required
                    value={refApprover}
                    onChange={setRefApprover}
                    inputValue={refApproverInput}
                    onInputChange={setRefApproverInput}
                    options={APPROVER_OPTIONS}
                    getOptionLabel={(u) => (u ? `${u.name} — ${u.department}` : '')}
                    isOptionEqualToValue={(a, b) => a.id === b.id}
                    placeholder="Search & Add an ALT/SALT"
                    accentArrow={true}
                  />

                  {/* Field 8: Entity Name Search */}
                  <SharedSearchInput
                    label="Entity Name"
                    required
                    value={refEntitySearch}
                    onChange={setRefEntitySearch}
                    placeholder="Search for an Entity by Name or ID"
                    accentArrow={true}
                    onSearch={(val) => {
                      console.log('Searching entity:', val);
                    }}
                  />

                  {/* Entity Table Grid matching Screenshot */}
                  <div className="pt-2">
                    <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
                      <div className="grid grid-cols-6 bg-slate-50 border-b border-slate-200 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <div>Name</div>
                        <div>Type</div>
                        <div>Sector</div>
                        <div>Function</div>
                        <div>Region</div>
                        <div className="text-right">Remove</div>
                      </div>
                      <div className="py-8 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        NO DATA
                      </div>
                    </div>
                  </div>

                  {/* NEW: Reason field — SharedTextArea */}
                  <SharedTextArea
                    label="Reason / Justification"
                    value={refReason}
                    onChange={setRefReason}
                    placeholder="Describe the rationale for initiating this audit"
                    rows={3}
                    maxLength={300}
                    showCharCount
                    error={refFormSubmitted && !refReason}
                    errorMessage="Reason is required."
                  />

                  {/* Footer Actions — using SharedButton */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                    <SharedButton
                      variant="danger"
                      type="button"
                      onClick={() => {
                        setRefAuditName('');
                        setRefAuditType('');
                        setRefAuditFunction('');
                        setRefMainDriver('');
                        setRefQuarter('Q1');
                        setRefRisks([]);
                        setRefApprover(null);
                        setRefApproverInput('');
                        setRefEntitySearch('');
                        setRefReason('');
                        setRefFormSubmitted(false);
                      }}
                    >
                      Cancel
                    </SharedButton>
                    <SharedButton
                      variant="primary"
                      type="submit"
                      disabled={!refAuditName}
                    >
                      Add
                    </SharedButton>
                  </div>
                </form>
              </div>

              {/* State Inspection Panel */}
              <div className="bg-slate-900 text-slate-300 rounded-lg p-4 font-mono text-xs overflow-x-auto shadow-md">
                <div className="text-slate-400 font-sans font-bold uppercase tracking-wider text-[11px] mb-2 flex justify-between">
                  <span>Parent Controlled State Dump</span>
                  <span className="text-emerald-400 font-sans">Synced in Real-Time</span>
                </div>
                <pre>
                  {JSON.stringify(
                    {
                      auditName: refAuditName,
                      auditType: refAuditType,
                      auditFunction: refAuditFunction,
                      mainDriver: refMainDriver,
                      quarter: refQuarter,
                      inScopeL2Risks: refRisks,
                      approver: refApprover ? refApprover.name : null,
                      entitySearch: refEntitySearch,
                      reason: refReason,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: SHARED TEXT INPUT
              ======================================================== */}
          {activeTab === 'text' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800">SharedTextInput</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Controlled text input powered by MUI InputBase and styled with compact enterprise Tailwind tokens.
                </p>
              </div>

              {/* Interactive Live Tester Card */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Component Playground
                  </span>
                  <span className="text-xs text-slate-400">Controlled by header toggles</span>
                </div>

                <div className="max-w-md">
                  <SharedTextInput
                    label="Audit Name"
                    value={demoTextVal}
                    onChange={setDemoTextVal}
                    placeholder="Enter audit name"
                    required={playRequired}
                    error={playError}
                    errorMessage={playError ? 'Audit Name is invalid or already registered.' : undefined}
                    helperText={!playError ? 'Unique identifier for the audit engagement' : undefined}
                    disabled={playDisabled}
                    readOnly={playReadOnly}
                    size={playSize}
                  />
                </div>

                <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Current Value:</span>
                  <code className="bg-slate-100 px-2 py-0.5 rounded text-blue-700 font-mono">
                    &quot;{demoTextVal}&quot;
                  </code>
                </div>
              </div>

              {/* State Variants Gallery */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                  Comprehensive State Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Default / Empty */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">1. Default Empty</span>
                    <SharedTextInput
                      label="Audit Name"
                      value=""
                      onChange={() => {}}
                      placeholder="Enter audit name"
                    />
                  </div>

                  {/* Required with Value */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">2. Required With Value</span>
                    <SharedTextInput
                      label="Audit Name"
                      required
                      value="Q3 Treasury Controls Audit"
                      onChange={() => {}}
                    />
                  </div>

                  {/* Error State */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">3. Error State with Message</span>
                    <SharedTextInput
                      label="Audit Name"
                      required
                      value="Inv@lid Name!"
                      onChange={() => {}}
                      error
                      errorMessage="Audit name cannot contain special characters."
                    />
                  </div>

                  {/* Disabled State */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">4. Disabled State</span>
                    <SharedTextInput
                      label="Audit Name (Locked)"
                      value="Locked Engagement 2026"
                      disabled
                      onChange={() => {}}
                    />
                  </div>

                  {/* With Adornments */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">5. Adornments & MaxLength</span>
                    <SharedTextInput
                      label="Project Code"
                      value="AUD-9021"
                      onChange={() => {}}
                      maxLength={10}
                      startAdornment={<span className="text-xs font-bold text-slate-400">#</span>}
                      endAdornment={<span className="text-[10px] text-slate-400">8/10</span>}
                    />
                  </div>

                  {/* Read Only */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">6. Read Only</span>
                    <SharedTextInput
                      label="System Generated ID"
                      value="SYS-AUDIT-8849"
                      readOnly
                      onChange={() => {}}
                      helperText="Generated automatically upon creation."
                    />
                  </div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="bg-slate-900 text-slate-200 p-4 rounded-lg border border-slate-800 text-xs font-mono relative">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `<SharedTextInput\n  label="Audit Name"\n  required\n  value={auditName}\n  onChange={setAuditName}\n  placeholder="Enter audit name"\n/>`,
                      'text-code'
                    )
                  }
                  className="absolute top-3 right-3 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                  aria-label="Copy snippet"
                >
                  {copiedCode === 'text-code' ? <CheckCircleOutlinedIcon className="!w-4 !h-4 text-emerald-400" /> : <ContentCopyIcon className="!w-4 !h-4" />}
                </button>
                <div className="text-slate-400 mb-2 font-sans font-semibold">Example Usage</div>
                <pre>{`<SharedTextInput
  label="Audit Name"
  required
  value={auditName}
  onChange={setAuditName}
  placeholder="Enter audit name"
/>`}</pre>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: SHARED SELECT
              ======================================================== */}
          {activeTab === 'select' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800">SharedSelect</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Generic single-select dropdown combining accessible MUI Select with compact Tailwind design.
                </p>
              </div>

              {/* Live Playground */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Component Playground
                  </span>
                  <span className="text-xs text-slate-400">Try selecting different options</span>
                </div>

                <div className="max-w-md">
                  <SharedSelect
                    label="Audit Type"
                    value={demoSelectVal}
                    onChange={setDemoSelectVal}
                    options={AUDIT_TYPE_OPTIONS}
                    placeholder="Select One"
                    required={playRequired}
                    error={playError}
                    errorMessage={playError ? 'Please select a valid audit type.' : undefined}
                    helperText={!playError ? 'Defines the methodology and auditing framework' : undefined}
                    disabled={playDisabled}
                    readOnly={playReadOnly}
                    loading={playLoading}
                    size={playSize}
                  />
                </div>

                <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Selected Value:</span>
                  <code className="bg-slate-100 px-2 py-0.5 rounded text-blue-700 font-mono">
                    &quot;{demoSelectVal}&quot;
                  </code>
                </div>
              </div>

              {/* State Variants Gallery */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                  State Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">1. Placeholder State (Unselected)</span>
                    <SharedSelect
                      label="Audit Function"
                      required
                      value=""
                      onChange={() => {}}
                      options={AUDIT_FUNCTION_OPTIONS}
                      placeholder="Select One"
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">2. Pre-selected Value</span>
                    <SharedSelect
                      label="Main Driver"
                      required
                      value="regulatory"
                      onChange={() => {}}
                      options={MAIN_DRIVER_OPTIONS}
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">3. Error Validation State</span>
                    <SharedSelect
                      label="Audit Type"
                      required
                      value=""
                      onChange={() => {}}
                      options={AUDIT_TYPE_OPTIONS}
                      error
                      errorMessage="Selection is mandatory before proceeding."
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">4. Loading State</span>
                    <SharedSelect
                      label="Remote Classification"
                      value=""
                      onChange={() => {}}
                      options={[]}
                      loading
                      placeholder="Fetching options..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: SHARED MULTI SELECT
              ======================================================== */}
          {activeTab === 'multiselect' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800">SharedMultiSelect</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Accessible multiple selection with search, tag limits, checkboxes, and compact chips.
                </p>
              </div>

              {/* Live Playground */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Component Playground
                  </span>
                  <span className="text-xs text-slate-400">Searchable dropdown with multi-checkbox</span>
                </div>

                <div className="max-w-md">
                  <SharedMultiSelect
                    label="In Scope L2 Risks"
                    value={demoMultiVal}
                    onChange={setDemoMultiVal}
                    options={L2_RISK_OPTIONS}
                    placeholder="Select risks"
                    accentArrow={true}
                    required={playRequired}
                    error={playError}
                    errorMessage={playError ? 'Please select at least one risk.' : undefined}
                    disabled={playDisabled}
                    readOnly={playReadOnly}
                    loading={playLoading}
                    size={playSize}
                  />
                </div>

                <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Selected Array ({demoMultiVal.length}):</span>
                  <code className="bg-slate-100 px-2 py-0.5 rounded text-blue-700 font-mono">
                    {JSON.stringify(demoMultiVal)}
                  </code>
                </div>
              </div>

              {/* State Variants Gallery */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                  State Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">1. Empty State</span>
                    <SharedMultiSelect
                      label="In Scope L2 Risks"
                      required
                      value={[]}
                      onChange={() => {}}
                      options={L2_RISK_OPTIONS}
                      placeholder="Select risks"
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">2. Limit Tags (+N More Overflow)</span>
                    <SharedMultiSelect
                      label="In Scope L2 Risks (Limit 1)"
                      value={['cyber_security', 'third_party', 'regulatory_compliance']}
                      onChange={() => {}}
                      options={L2_RISK_OPTIONS}
                      limitTags={1}
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">3. Error State</span>
                    <SharedMultiSelect
                      label="In Scope L2 Risks"
                      required
                      value={[]}
                      onChange={() => {}}
                      options={L2_RISK_OPTIONS}
                      error
                      errorMessage="Risk assessment requires at least one L2 risk classification."
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">4. Disabled State</span>
                    <SharedMultiSelect
                      label="In Scope L2 Risks (Archived)"
                      value={['fraud_bribery']}
                      onChange={() => {}}
                      options={L2_RISK_OPTIONS}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: SHARED RADIO GROUP
              ======================================================== */}
          {activeTab === 'radio' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800">SharedRadioGroup</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Controlled radio group supporting both horizontal row layout (as seen in the reference) and vertical column layouts.
                </p>
              </div>

              {/* Live Playground */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Component Playground (Horizontal Row)
                  </span>
                  <span className="text-xs text-slate-400">direction=&quot;row&quot;</span>
                </div>

                <div className="max-w-md">
                  <SharedRadioGroup
                    label="Planned Quarter"
                    value={demoRadioVal}
                    onChange={setDemoRadioVal}
                    options={QUARTER_OPTIONS}
                    direction="row"
                    required={playRequired}
                    error={playError}
                    errorMessage={playError ? 'Please choose a target quarter.' : undefined}
                    disabled={playDisabled}
                    size={playSize}
                  />
                </div>

                <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Selected Quarter:</span>
                  <code className="bg-slate-100 px-2 py-0.5 rounded text-blue-700 font-mono">
                    &quot;{demoRadioVal}&quot;
                  </code>
                </div>
              </div>

              {/* Variants */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                  Layout Variants
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Row layout */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">1. Horizontal (Reference Design)</span>
                    <SharedRadioGroup
                      label="Planned Quarter"
                      required
                      value="Q3"
                      onChange={() => {}}
                      options={QUARTER_OPTIONS}
                      direction="row"
                    />
                  </div>

                  {/* Column layout */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">2. Vertical Column Layout</span>
                    <SharedRadioGroup
                      label="Audit Priority"
                      value="high"
                      onChange={() => {}}
                      direction="column"
                      options={[
                        { value: 'critical', label: 'Critical — Immediate Executive Escalation' },
                        { value: 'high', label: 'High Priority' },
                        { value: 'medium', label: 'Standard Routine' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: SHARED AUTOCOMPLETE
              ======================================================== */}
          {activeTab === 'autocomplete' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800">SharedAutocomplete</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Generic object-based autocomplete exposing independent controlled value and text inputValue states.
                </p>
              </div>

              {/* Live Playground */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Component Playground (Object Model)
                  </span>
                  <span className="text-xs text-slate-400">Independent value + inputValue states</span>
                </div>

                <div className="max-w-md">
                  <SharedAutocomplete<UserApprover>
                    label="Add Approver"
                    value={demoAutoVal}
                    onChange={setDemoAutoVal}
                    inputValue={demoAutoInput}
                    onInputChange={setDemoAutoInput}
                    options={APPROVER_OPTIONS}
                    getOptionLabel={(u) => (u ? `${u.name} (${u.title})` : '')}
                    isOptionEqualToValue={(a, b) => a.id === b.id}
                    placeholder="Search & Add an ALT/SALT"
                    accentArrow={true}
                    required={playRequired}
                    error={playError}
                    errorMessage={playError ? 'Approver must be an accredited SALT/ALT member.' : undefined}
                    disabled={playDisabled}
                    readOnly={playReadOnly}
                    loading={playLoading}
                    size={playSize}
                  />
                </div>

                <div className="pt-2 text-xs text-slate-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Selected Value:</span>
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-blue-700 font-mono">
                      {demoAutoVal ? demoAutoVal.name : 'null'}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Current Input Text:</span>
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-indigo-700 font-mono">
                      &quot;{demoAutoInput}&quot;
                    </code>
                  </div>
                </div>
              </div>

              {/* State Variants Gallery */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                  State Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">1. Empty Search State</span>
                    <SharedAutocomplete<string>
                      label="Add Approver"
                      value={null}
                      onChange={() => {}}
                      options={['Sarah Jenkins', 'Marcus Vance', 'David Chen']}
                      placeholder="Search & Add an ALT/SALT"
                      accentArrow={true}
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">2. Loading Options State</span>
                    <SharedAutocomplete<string>
                      label="Active Directory Search"
                      value={null}
                      onChange={() => {}}
                      options={[]}
                      loading
                      placeholder="Querying Microsoft Graph..."
                      accentArrow={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 7: SHARED SEARCH INPUT
              ======================================================== */}
          {activeTab === 'search' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800">SharedSearchInput</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Controlled search input with search icon, clear button, optional debounce, and dropdown indicator.
                </p>
              </div>

              {/* Live Playground */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Component Playground
                  </span>
                  <span className="text-xs text-slate-400">Press Enter or type to trigger search</span>
                </div>

                <div className="max-w-md">
                  <SharedSearchInput
                    label="Entity Name"
                    value={demoSearchVal}
                    onChange={setDemoSearchVal}
                    onSearch={(query) => setLastSearchResult(query)}
                    placeholder="Search for an Entity by Name or ID"
                    accentArrow={true}
                    debounceMs={300}
                    required={playRequired}
                    error={playError}
                    errorMessage={playError ? 'No matching entity found in Dataverse registry.' : undefined}
                    disabled={playDisabled}
                    readOnly={playReadOnly}
                    loading={playLoading}
                    size={playSize}
                  />
                </div>

                <div className="pt-2 text-xs text-slate-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Input Value:</span>
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-blue-700 font-mono">
                      &quot;{demoSearchVal}&quot;
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Last Triggered onSearch:</span>
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-emerald-700 font-mono">
                      &quot;{lastSearchResult}&quot;
                    </code>
                  </div>
                </div>
              </div>

              {/* State Variants Gallery */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                  State Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">1. Empty Search Field</span>
                    <SharedSearchInput
                      label="Entity Name"
                      required
                      value=""
                      onChange={() => {}}
                      placeholder="Search for an Entity by Name or ID"
                      accentArrow={true}
                    />
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">2. Active Loading Spinner</span>
                    <SharedSearchInput
                      label="Entity Name"
                      value="Searching..."
                      onChange={() => {}}
                      loading
                      placeholder="Search for an Entity by Name or ID"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              NEW TAB: SharedTextArea
              ================================================================ */}
          {activeTab === 'textarea' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800">SharedTextArea</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Controlled multiline textarea. Follows the exact same visual language as SharedTextInput — same borders, labels, and error patterns.
                </p>
              </div>

              {/* Live Playground */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Playground</span>
                  <span className="text-xs text-slate-400">Controlled by header toggles</span>
                </div>

                <div className="max-w-md">
                  <SharedTextArea
                    label="Audit Reason / Justification"
                    value={demoTextAreaVal}
                    onChange={setDemoTextAreaVal}
                    placeholder="Describe the rationale and scope of this audit engagement"
                    required={playRequired}
                    error={playError}
                    errorMessage={playError ? 'Justification is required before submission.' : undefined}
                    helperText={!playError ? 'Provide sufficient context for the audit committee review.' : undefined}
                    disabled={playDisabled}
                    readOnly={playReadOnly}
                    rows={4}
                    maxLength={500}
                    showCharCount
                  />
                </div>

                <div className="pt-2 text-xs text-slate-500 flex items-start gap-2">
                  <span className="font-semibold text-slate-700 shrink-0">Current Value ({demoTextAreaVal.length} chars):</span>
                  <code className="bg-slate-100 px-2 py-0.5 rounded text-blue-700 font-mono break-all">
                    &quot;{demoTextAreaVal.slice(0, 80)}{demoTextAreaVal.length > 80 ? '...' : ''}&quot;
                  </code>
                </div>
              </div>

              {/* State Variants Gallery */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">State Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* 1 — Default empty */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">1. Default Empty</span>
                    <SharedTextArea
                      label="Reason"
                      value=""
                      onChange={() => {}}
                      placeholder="Enter reason here"
                      rows={3}
                    />
                  </div>

                  {/* 2 — Required with value */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">2. Required With Value</span>
                    <SharedTextArea
                      label="Reason"
                      required
                      value="Regulatory mandate from the Financial Conduct Authority requires an annual review of all treasury operations."
                      onChange={() => {}}
                      rows={3}
                    />
                  </div>

                  {/* 3 — Error */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">3. Error State</span>
                    <SharedTextArea
                      label="Reason"
                      required
                      value=""
                      onChange={() => {}}
                      error
                      errorMessage="Justification cannot be empty."
                      rows={3}
                    />
                  </div>

                  {/* 4 — Disabled */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">4. Disabled</span>
                    <SharedTextArea
                      label="Archived Reason"
                      value="Locked audit record — reason cannot be edited."
                      onChange={() => {}}
                      disabled
                      rows={3}
                    />
                  </div>

                  {/* 5 — Read-only */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">5. Read-only</span>
                    <SharedTextArea
                      label="Executive Summary (Read-only)"
                      value="All Treasury controls scored Satisfactory. No material exceptions identified."
                      onChange={() => {}}
                      readOnly
                      rows={3}
                      helperText="Auto-generated on audit close."
                    />
                  </div>

                  {/* 6 — Character count */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">6. Character Count (maxLength)</span>
                    <SharedTextArea
                      label="Short Summary"
                      value="Quarterly review of SOX controls."
                      onChange={() => {}}
                      rows={3}
                      maxLength={100}
                      showCharCount
                      helperText="Appears in the executive dashboard widget."
                    />
                  </div>

                  {/* 7 — Auto-grow (minRows / maxRows) */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">7. Auto-grow (minRows=2 maxRows=6)</span>
                    <SharedTextArea
                      label="Auto-expanding Notes"
                      value="Type here to grow the textarea up to 6 rows automatically."
                      onChange={() => {}}
                      minRows={2}
                      maxRows={6}
                      placeholder="Notes will expand as you type…"
                    />
                  </div>

                  {/* 8 — Resize none */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">8. No Resize Handle</span>
                    <SharedTextArea
                      label="Fixed Size Notes"
                      value=""
                      onChange={() => {}}
                      rows={4}
                      resize="none"
                      placeholder="This area cannot be resized by the user."
                    />
                  </div>

                </div>
              </div>

              {/* Responsive container demo */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">Responsive Width Behaviour</h3>
                <p className="text-xs text-slate-500">
                  The component accepts <code className="bg-slate-100 px-1 rounded">fullWidth</code> (default) or <code className="bg-slate-100 px-1 rounded">className</code> for constrained layouts.
                  Resize the browser window — the textarea adapts fluidly.
                </p>
                <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-4">
                  <SharedTextArea label="Full width (default)" value="" onChange={() => {}} placeholder="100% of container" rows={2} />
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <SharedTextArea label="50% on tablet+" value="" onChange={() => {}} placeholder="Left column" rows={2} className="sm:w-1/2" />
                    <SharedTextArea label="50% on tablet+" value="" onChange={() => {}} placeholder="Right column" rows={2} className="sm:w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              NEW TAB: SharedButton
              ================================================================ */}
          {activeTab === 'button' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800">SharedButton</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Enterprise-grade button with 5 variants, 3 sizes, loading state, icon support, and Tailwind-driven styling that matches the existing shared input library.
                </p>
              </div>

              {/* Variants */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100">Variants</div>
                <div className="flex flex-wrap gap-3">
                  <SharedButton variant="primary">Primary</SharedButton>
                  <SharedButton variant="secondary">Secondary</SharedButton>
                  <SharedButton variant="outline">Outline</SharedButton>
                  <SharedButton variant="text">Text</SharedButton>
                  <SharedButton variant="danger">Danger</SharedButton>
                </div>
              </div>

              {/* Sizes */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100">Sizes</div>
                <div className="flex flex-wrap items-center gap-3">
                  <SharedButton variant="primary" size="small">Small</SharedButton>
                  <SharedButton variant="primary" size="medium">Medium</SharedButton>
                  <SharedButton variant="primary" size="large">Large</SharedButton>
                </div>
              </div>

              {/* States */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100">States</div>
                <div className="flex flex-wrap gap-3">
                  <SharedButton variant="primary" disabled>Disabled Primary</SharedButton>
                  <SharedButton variant="secondary" disabled>Disabled Secondary</SharedButton>
                  <SharedButton variant="outline" disabled>Disabled Outline</SharedButton>
                  <SharedButton variant="danger" disabled>Disabled Danger</SharedButton>
                </div>
              </div>

              {/* Loading */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100">Loading State (click to trigger 2 s)</div>
                <div className="flex flex-wrap items-center gap-3">
                  <SharedButton variant="primary" loading={btnLoading} onClick={simulateLoading}>
                    {btnLoading ? 'Saving…' : 'Save Audit'}
                  </SharedButton>
                  <SharedButton variant="outline" loading={btnLoading} onClick={simulateLoading}>
                    {btnLoading ? 'Validating…' : 'Validate'}
                  </SharedButton>
                  <SharedButton variant="danger" loading={btnLoading} onClick={simulateLoading}>
                    {btnLoading ? 'Deleting…' : 'Delete'}
                  </SharedButton>
                </div>
              </div>

              {/* Icons */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100">Icons</div>
                <div className="flex flex-wrap items-center gap-3">
                  <SharedButton variant="primary" startIcon={<AddCircleOutlineIcon />}>Add Audit</SharedButton>
                  <SharedButton variant="outline" endIcon={<SendIcon />}>Submit</SharedButton>
                  <SharedButton variant="secondary" startIcon={<SearchIcon />} size="small">Search</SharedButton>
                  <SharedButton variant="text" endIcon={<ContentCopyIcon />} size="small">Copy ID</SharedButton>
                </div>
              </div>

              {/* Width */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100">Width Control</div>
                <SharedButton variant="primary" fullWidth>Full Width Primary</SharedButton>
                <div className="flex flex-col sm:flex-row gap-3">
                  <SharedButton variant="outline" className="w-full sm:w-auto">Responsive (full on mobile)</SharedButton>
                  <SharedButton variant="secondary" className="w-full sm:w-auto">Responsive (auto on sm+)</SharedButton>
                </div>
              </div>

              {/* Interactive playground */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100">Live Playground — controlled by header toggles</div>
                <div className="flex flex-wrap gap-3">
                  {(['primary', 'secondary', 'outline', 'text', 'danger'] as const).map((v) => (
                    <SharedButton
                      key={v}
                      variant={v}
                      size={playSize}
                      disabled={playDisabled}
                      loading={playLoading}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </SharedButton>
                  ))}
                </div>
              </div>

              {/* Reference form footer pattern */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">Reference Form Footer Pattern</h3>
                <p className="text-xs text-slate-500">
                  Exact Cancel / Add button pair matching the &quot;Add New Audit&quot; reference screenshot, now using <code className="bg-slate-100 px-1 rounded">SharedButton</code>.
                </p>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                    <SharedButton variant="danger">Cancel</SharedButton>
                    <SharedButton variant="secondary" disabled>Add</SharedButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InputComponentsPreview;
