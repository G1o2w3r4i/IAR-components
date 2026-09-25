import React, { useMemo, useState } from 'react';
import { SharedButton, SharedTable, type TableColumn } from '../shared';

/**
 * ButtonComponentsPreview
 * 
 * Demonstrates all SharedButton variants matching the IAR audit UI reference:
 * - EDIT button (orange/coral outline)
 * - Send For Approval button (green solid)
 * - REMOVE AUDIT button (gray outline)
 */
type PreviewRow = {
  id: number;
  name: string;
  owner: string;
  status: string;
  risk: string;
  updated: string;
  amount: string;
};

const referenceColumns: TableColumn<any>[] = [
  { id: 'auditPlan', label: 'Audit Plan', width: '18%', render: (row: any) => <span className="font-semibold text-slate-700">{row.auditCode}</span> },
  { id: 'dateReceived', label: 'Date Received', width: '18%', render: (row: any) => <span>{row.dateReceived}</span> },
  { id: 'submittedBy', label: 'Submitted By', width: '19%', render: (row: any) => <span>{row.submittedBy}</span> },
  { id: 'approval', label: 'Approval For', width: '22%', render: (row: any) => <span>{row.approval}</span> },
  { id: 'dateCompleted', label: 'Date Completed / Canceled', width: '17%', render: (row: any) => <span>{row.dateCompleted}</span> },
  { id: 'status', label: 'Request Status', width: '12%', align: 'right', render: (row: any) => <span>{row.status === 'PENDING' ? 'PENDING' : 'COMPLETE'}</span> },
];

const referenceRows = [
  { auditCode: 'RBR 2003', dateReceived: 'October 15, 2025 at 6:24:57 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 1 Audit Plan (ALT Approval)', dateCompleted: '-', status: 'PENDING' },
  { auditCode: 'RBR 1909', dateReceived: 'October 13, 2025 at 11:41:38 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 2 Audit Plan (SALT Approval)', dateCompleted: 'October 13, 2025 at 12:27:45 PM', status: 'COMPLETE' },
  { auditCode: 'RBR 1909', dateReceived: 'October 13, 2025 at 11:28:07 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 1 Audit Plan (SALT Approval)', dateCompleted: 'October 13, 2025 at 12:19:27 PM', status: 'COMPLETE' },
  { auditCode: 'RBR 1915', dateReceived: 'October 13, 2025 at 7:40:57 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 2 Audit Plan (SALT Approval)', dateCompleted: 'October 13, 2025 at 11:19:24 AM', status: 'COMPLETE' },
  { auditCode: 'RBR 1915', dateReceived: 'October 13, 2025 at 7:08:06 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 1 Audit Plan (SALT Approval)', dateCompleted: 'October 13, 2025 at 7:32:43 AM', status: 'COMPLETE' },
  { auditCode: 'RBR 1914', dateReceived: 'October 13, 2025 at 4:49:35 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 2 Audit Plan (SALT Approval)', dateCompleted: 'October 13, 2025 at 6:52:27 AM', status: 'COMPLETE' },
];

const genericColumns: TableColumn<PreviewRow>[] = [
  { id: 'name', label: 'Name', field: 'name', sortable: true, width: '32%' },
  { id: 'owner', label: 'Owner', field: 'owner', sortable: true, width: '18%' },
  { id: 'status', label: 'Status', field: 'status', sortable: true, width: '16%' },
  { id: 'risk', label: 'Risk', field: 'risk', sortable: true, width: '14%' },
  { id: 'updated', label: 'Updated', field: 'updated', sortable: true, width: '12%' },
  { id: 'amount', label: 'Amount', field: 'amount', sortable: true, align: 'right', width: '8%' },
];

const genericRows: PreviewRow[] = [
  { id: 1, name: 'Quarterly Controls Review', owner: 'A. Smith', status: 'In Review', risk: 'Low', updated: '2 days ago', amount: '$12.4K' },
  { id: 2, name: 'Vendor Risk Assessment', owner: 'J. Brooks', status: 'Approved', risk: 'Medium', updated: '4 days ago', amount: '$18.7K' },
  { id: 3, name: 'Policy Exception Register', owner: 'R. Chen', status: 'Pending', risk: 'High', updated: '1 week ago', amount: '$7.2K' },
  { id: 4, name: 'Access Review Cycle', owner: 'M. Gomez', status: 'Draft', risk: 'Low', updated: '3 days ago', amount: '$5.8K' },
  { id: 5, name: 'Cloud Security Audit', owner: 'L. Patel', status: 'Submitted', risk: 'Medium', updated: '5 days ago', amount: '$22.1K' },
  { id: 6, name: 'Data Retention Review', owner: 'N. Walker', status: 'Approved', risk: 'Low', updated: '6 days ago', amount: '$9.6K' },
  { id: 7, name: 'Internal Compliance Check', owner: 'D. Lee', status: 'In Review', risk: 'High', updated: '1 day ago', amount: '$14.8K' },
  { id: 8, name: 'Third Party Review', owner: 'S. Jordan', status: 'Pending', risk: 'Medium', updated: '2 weeks ago', amount: '$3.4K' },
];

export const ButtonComponentsPreview: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState<string | null>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedRows = useMemo(() => {
    if (!sortField) {
      return genericRows;
    }

    const sorted = [...genericRows].sort((a, b) => {
      const left = String(a[sortField as keyof PreviewRow] ?? '');
      const right = String(b[sortField as keyof PreviewRow] ?? '');
      return left.localeCompare(right) * (sortDirection === 'asc' ? 1 : -1);
    });

    return sorted;
  }, [sortField, sortDirection]);

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedRows.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, sortedRows]);

  const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
    setPage(0);
  };

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
      {/* SharedTable Preview */}
      {/* ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f4] p-0 shadow-none">
        <div className="overflow-hidden rounded-none border border-slate-200 bg-white">
          <SharedTable
            columns={referenceColumns}
            rows={referenceRows}
            stickyHeader
            showPagination={false}
            noBorder
            className="border-0 shadow-none"
          />
        </div>
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          SharedTable States and Behaviors
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Basic table</h3>
            <SharedTable columns={genericColumns} rows={genericRows.slice(0, 4)} stickyHeader />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Dense table</h3>
            <SharedTable columns={genericColumns} rows={genericRows.slice(0, 3)} dense stickyHeader />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Sorting + pagination</h3>
            <SharedTable
              columns={genericColumns.map((column) => ({ ...column, sortable: column.id !== 'amount' }))}
              rows={paginatedRows}
              page={page}
              rowsPerPage={rowsPerPage}
              totalCount={sortedRows.length}
              onPageChange={setPage}
              onRowsPerPageChange={(value) => {
                setRowsPerPage(value);
                setPage(0);
              }}
              sortField={sortField}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
              stickyHeader
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Loading state</h3>
            <SharedTable columns={genericColumns} rows={[]} loading stickyHeader />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Empty state</h3>
            <SharedTable columns={genericColumns} rows={[]} emptyMessage="No audit records available." stickyHeader />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Error state</h3>
            <SharedTable
              columns={genericColumns}
              rows={[]}
              error="Unable to load data right now. Please try again later."
              stickyHeader
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Custom cell rendering</h3>
            <SharedTable
              columns={[
                { id: 'name', label: 'Name', field: 'name', width: '30%' },
                { id: 'status', label: 'Status', field: 'status', width: '20%' },
                { id: 'action', label: 'Action', width: '20%', render: () => (
                  <div className="flex gap-2">
                    <SharedButton variant="text" size="small">
                      View
                    </SharedButton>
                    <SharedButton variant="outline" size="small">
                      Edit
                    </SharedButton>
                  </div>
                ) },
              ]}
              rows={genericRows.slice(0, 3)}
              stickyHeader
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Responsive behavior</h3>
            <div className="overflow-x-auto">
              <SharedTable
                columns={[
                  { id: 'name', label: 'Name', field: 'name', width: '260px' },
                  { id: 'owner', label: 'Owner', field: 'owner', width: '180px' },
                  { id: 'status', label: 'Status', field: 'status', width: '160px' },
                  { id: 'risk', label: 'Risk', field: 'risk', width: '140px' },
                  { id: 'updated', label: 'Updated', field: 'updated', width: '180px' },
                  { id: 'amount', label: 'Amount', field: 'amount', align: 'right', width: '120px' },
                ]}
                rows={genericRows.slice(0, 4)}
                stickyHeader
                className="min-w-[760px]"
              />
            </div>
          </div>
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
