import React from 'react';
import { SharedButton } from '../shared';

/**
 * ButtonComponentsPreview
 * 
 * Demonstrates all SharedButton variants matching the IAR audit UI reference:
 * - EDIT button (orange/coral outline)
 * - Send For Approval button (green solid)
 * - REMOVE AUDIT button (gray outline)
 */
export const ButtonComponentsPreview: React.FC = () => {
  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      {/* ────────────────────────────────────────────────────────────── */}
      {/* Header */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Button Components
        </h1>
        <p className="text-slate-600">
          Reusable button components matching IAR audit interface design
        </p>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* IAR Audit Action Buttons */}
      {/* ────────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          IAR Audit Action Buttons
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Buttons matching the exact colors and styles from the audit interface reference
        </p>
        
        <div className="flex flex-wrap gap-4">
          <SharedButton variant="outline">
            REMOVE AUDIT
          </SharedButton>
          
          <SharedButton variant="edit">
            EDIT
          </SharedButton>
          
          <SharedButton variant="success">
            Send For Approval
          </SharedButton>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* All Button Variants */}
      {/* ────────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          All Available Variants
        </h2>
        
        <div className="space-y-6">
          {/* Primary */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Primary</h3>
            <div className="flex flex-wrap gap-3">
              <SharedButton variant="primary" size="small">
                Small Primary
              </SharedButton>
              <SharedButton variant="primary" size="medium">
                Medium Primary
              </SharedButton>
              <SharedButton variant="primary" size="large">
                Large Primary
              </SharedButton>
              <SharedButton variant="primary" size="medium" disabled>
                Disabled
              </SharedButton>
              <SharedButton variant="primary" size="medium" loading>
                Loading
              </SharedButton>
            </div>
          </div>

          {/* Success (Green) */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Success</h3>
            <div className="flex flex-wrap gap-3">
              <SharedButton variant="success" size="small">
                Small Success
              </SharedButton>
              <SharedButton variant="success" size="medium">
                Send For Approval
              </SharedButton>
              <SharedButton variant="success" size="large">
                Large Success
              </SharedButton>
              <SharedButton variant="success" size="medium" disabled>
                Disabled
              </SharedButton>
              <SharedButton variant="success" size="medium" loading>
                Processing
              </SharedButton>
            </div>
          </div>

          {/* Edit (Orange) */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Edit</h3>
            <div className="flex flex-wrap gap-3">
              <SharedButton variant="edit" size="small">
                EDIT
              </SharedButton>
              <SharedButton variant="edit" size="medium">
                EDIT
              </SharedButton>
              <SharedButton variant="edit" size="large">
                EDIT
              </SharedButton>
              <SharedButton variant="edit" size="medium" disabled>
                Disabled
              </SharedButton>
              <SharedButton variant="edit" size="medium" loading>
                Saving
              </SharedButton>
            </div>
          </div>

          {/* Outline */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Outline</h3>
            <div className="flex flex-wrap gap-3">
              <SharedButton variant="outline" size="small">
                REMOVE AUDIT
              </SharedButton>
              <SharedButton variant="outline" size="medium">
                REMOVE AUDIT
              </SharedButton>
              <SharedButton variant="outline" size="large">
                REMOVE AUDIT
              </SharedButton>
              <SharedButton variant="outline" size="medium" disabled>
                Disabled
              </SharedButton>
              <SharedButton variant="outline" size="medium" loading>
                Processing
              </SharedButton>
            </div>
          </div>

          {/* Secondary */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Secondary</h3>
            <div className="flex flex-wrap gap-3">
              <SharedButton variant="secondary" size="small">
                Small Secondary
              </SharedButton>
              <SharedButton variant="secondary" size="medium">
                Medium Secondary
              </SharedButton>
              <SharedButton variant="secondary" size="large">
                Large Secondary
              </SharedButton>
              <SharedButton variant="secondary" size="medium" disabled>
                Disabled
              </SharedButton>
            </div>
          </div>

          {/* Danger */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Danger</h3>
            <div className="flex flex-wrap gap-3">
              <SharedButton variant="danger" size="small">
                Delete
              </SharedButton>
              <SharedButton variant="danger" size="medium">
                Delete Item
              </SharedButton>
              <SharedButton variant="danger" size="large">
                Permanently Delete
              </SharedButton>
              <SharedButton variant="danger" size="medium" disabled>
                Disabled
              </SharedButton>
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Text</h3>
            <div className="flex flex-wrap gap-3">
              <SharedButton variant="text" size="small">
                Cancel
              </SharedButton>
              <SharedButton variant="text" size="medium">
                Cancel
              </SharedButton>
              <SharedButton variant="text" size="large">
                Cancel
              </SharedButton>
              <SharedButton variant="text" size="medium" disabled>
                Disabled
              </SharedButton>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* Full Width Example */}
      {/* ────────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Full Width Buttons
        </h2>
        
        <div className="space-y-3 max-w-md">
          <SharedButton variant="success" fullWidth>
            Send For Approval
          </SharedButton>
          <SharedButton variant="edit" fullWidth>
            EDIT
          </SharedButton>
          <SharedButton variant="outline" fullWidth>
            REMOVE AUDIT
          </SharedButton>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* Button Group Example (Horizontal Actions) */}
      {/* ────────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Audit Actions Layout
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Typical button layout for audit actions, as shown in reference image
        </p>
        
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded border border-gray-200">
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-gray-200 rounded text-xs text-gray-700">
              APPROVERS: <span className="bg-gray-400 rounded-full px-2 py-0.5 ml-1">A</span>
            </span>
            <span className="px-3 py-1 bg-green-500 text-white rounded text-xs">
              REQUEST TYPE: NEW
            </span>
          </div>
          
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Change Log
            </button>
            <SharedButton variant="outline" size="medium">
              REMOVE AUDIT
            </SharedButton>
            <SharedButton variant="edit" size="medium">
              EDIT
            </SharedButton>
            <SharedButton variant="success" size="medium">
              Send For Approval
            </SharedButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonComponentsPreview;
