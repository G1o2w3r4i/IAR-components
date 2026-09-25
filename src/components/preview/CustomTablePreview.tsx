import React, { useMemo, useState } from 'react';

type AuditStatus = 'PENDING' | 'COMPLETE';
type RiskLevel = 'low' | 'moderate' | 'high' | 'veryHigh';

type AuditRow = {
  auditCode: string;
  receivedAt: string;
  submittedBy: string;
  approval: string;
  completedAt: string;
  status: AuditStatus;
  risk: RiskLevel;
};

const baseRows: AuditRow[] = [
  { auditCode: 'RBR 2003', receivedAt: 'October 15, 2025 at 6:24:57 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 1 Audit Plan (ALT Approval)', completedAt: '-', status: 'PENDING', risk: 'low' },
  { auditCode: 'RBR 1909', receivedAt: 'October 13, 2025 at 11:41:38 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 2 Audit Plan (SALT Approval)', completedAt: 'October 13, 2025 at 12:27:45 PM', status: 'COMPLETE', risk: 'moderate' },
  { auditCode: 'RBR 1909', receivedAt: 'October 13, 2025 at 11:28:07 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 1 Audit Plan (SALT Approval)', completedAt: 'October 13, 2025 at 12:19:27 PM', status: 'COMPLETE', risk: 'high' },
  { auditCode: 'RBR 1915', receivedAt: 'October 13, 2025 at 7:40:57 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 2 Audit Plan (SALT Approval)', completedAt: 'October 13, 2025 at 11:19:24 AM', status: 'COMPLETE', risk: 'low' },
  { auditCode: 'RBR 1915', receivedAt: 'October 13, 2025 at 7:08:06 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 1 Audit Plan (SALT Approval)', completedAt: 'October 13, 2025 at 7:32:43 AM', status: 'COMPLETE', risk: 'moderate' },
  { auditCode: 'RBR 1914', receivedAt: 'October 13, 2025 at 4:49:35 AM', submittedBy: 'Avinash Sharma', approval: 'Phase 2 Audit Plan (SALT Approval)', completedAt: 'October 13, 2025 at 6:52:27 AM', status: 'COMPLETE', risk: 'veryHigh' },
  { auditCode: 'RBR 2010', receivedAt: 'October 12, 2025 at 9:15:21 AM', submittedBy: 'D. Miller', approval: 'Phase 1 Audit Plan (ALT Approval)', completedAt: 'October 12, 2025 at 10:11:43 AM', status: 'COMPLETE', risk: 'high' },
  { auditCode: 'RBR 1988', receivedAt: 'October 10, 2025 at 6:33:02 AM', submittedBy: 'S. Patel', approval: 'Phase 3 Audit Plan (SALT Approval)', completedAt: 'October 10, 2025 at 7:52:18 AM', status: 'COMPLETE', risk: 'low' },
];

const getRiskClass = (risk: RiskLevel) => `strength strength${risk[0].toUpperCase()}${risk.slice(1)}`;

const TableGrid: React.FC<{ rows: AuditRow[]; dense?: boolean; loading?: boolean; empty?: boolean; error?: boolean; }> = ({ rows, dense = false, loading = false, empty = false, error = false }) => {
  if (loading) {
    return (
      <div className="flex min-h-[180px] items-center justify-center bg-white text-sm font-medium text-slate-500">
        Loading audit data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[180px] items-center justify-center bg-white text-sm font-semibold text-red-600">
        Unable to load audit data.
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex min-h-[180px] items-center justify-center bg-white text-sm text-slate-500">
        No audit records available.
      </div>
    );
  }

  return (
    <div className="custom-audit-table w-full">
      <div className={`grid grid-cols-[1.2fr_1.2fr_1.1fr_1.5fr_1.3fr_0.9fr_46px] border-b border-slate-200 bg-[#f2f2f1] text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 ${dense ? 'text-[10px]' : ''}`}>
        <div className={`${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>Audit Plan</div>
        <div className={`${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>Date Received</div>
        <div className={`${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>Submitted By</div>
        <div className={`${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>Approval For</div>
        <div className={`${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>Date Completed / Canceled</div>
        <div className={`${dense ? 'px-3 py-2 text-right' : 'px-4 py-3 text-right'}`}>Request Status</div>
        <div className={`${dense ? 'px-2 py-2 text-right' : 'px-2 py-3 text-right'}`} />
      </div>

      {rows.map((row, rowIndex) => (
        <div
          key={`${row.auditCode}-${rowIndex}`}
          className={`grid grid-cols-[1.2fr_1.2fr_1.1fr_1.5fr_1.3fr_0.9fr_46px] border-b border-slate-200 bg-white text-[13px] text-slate-700 last:border-b-0 ${dense ? 'text-[12px]' : ''}`}
        >
          <div className={`${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#e75a46]">{row.auditCode}</span>
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 bg-white text-[9px] text-slate-400">◌</span>
            </div>
          </div>

          <div className={`${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>{row.receivedAt}</div>
          <div className={`${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>{row.submittedBy}</div>
          <div className={`${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>{row.approval}</div>
          <div className={`${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>{row.completedAt}</div>

          <div className={`flex items-center justify-end gap-2 ${dense ? 'px-3 py-2' : 'px-4 py-3'}`}>
            <span className={getRiskClass(row.risk)} aria-label={row.risk} />
            <span
              className={[
                'inline-flex items-center justify-center rounded-sm border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]',
                row.status === 'PENDING'
                  ? 'border-[#f0d88d] bg-[#fef7db] text-[#b98a00]'
                  : 'border-[#bfe8c8] bg-[#ebf9ee] text-[#0f8f4d]',
              ].join(' ')}
            >
              {row.status}
            </span>
          </div>

          <div className={`flex items-center justify-end ${dense ? 'px-2 py-2' : 'px-2 py-3'}`}>
            <button className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 bg-white text-[10px] text-slate-500">
              ◌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CustomTablePreview: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [denseMode, setDenseMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);

  const totalRows = baseRows.length;

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return baseRows.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <div className="space-y-8 bg-[#f5f5f3] p-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setDenseMode((value) => !value)}
          className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700"
        >
          {denseMode ? 'Normal density' : 'Dense mode'}
        </button>
        <button
          onClick={() => setLoading((value) => !value)}
          className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700"
        >
          {loading ? 'Stop loading' : 'Loading state'}
        </button>
        <button
          onClick={() => setEmpty((value) => !value)}
          className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700"
        >
          {empty ? 'Show data' : 'Empty state'}
        </button>
        <button
          onClick={() => setError((value) => !value)}
          className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700"
        >
          {error ? 'Clear error' : 'Error state'}
        </button>
      </div>

      <div className="overflow-hidden border border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.03)]">
        <TableGrid rows={empty ? [] : error ? [] : loading ? [] : paginatedRows} dense={denseMode} loading={loading} empty={empty} error={error} />
      </div>

      {!loading && !empty && !error && (
        <div className="flex items-center justify-between gap-4 rounded border border-slate-200 bg-white px-3 py-2">
          <div className="text-xs uppercase tracking-[0.12em] text-slate-500">
            Showing {Math.min(page * rowsPerPage + 1, totalRows)}-{Math.min((page + 1) * rowsPerPage, totalRows)} of {totalRows}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((value) => Math.max(value - 1, 0))}
              disabled={page === 0}
              className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((value) => Math.min(value + 1, Math.ceil(totalRows / rowsPerPage) - 1))}
              disabled={page >= Math.ceil(totalRows / rowsPerPage) - 1}
              className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
            <select
              value={rowsPerPage}
              onChange={(event) => {
                setRowsPerPage(Number(event.target.value));
                setPage(0);
              }}
              className="rounded border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium text-slate-700"
            >
              <option value={5}>5 rows</option>
              <option value={10}>10 rows</option>
              <option value={20}>20 rows</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTablePreview;
