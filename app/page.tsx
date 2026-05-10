"use client";

import React, { useMemo, useState } from "react";

const productName = "MaintenIQ";

const icons = {
  dashboard: "▦", clipboard: "▤", wrench: "⚙", users: "👥", boxes: "▣", bell: "◉",
  chart: "▥", scan: "▧", shield: "◆", clock: "◷", check: "✓", alert: "!",
  plus: "+", camera: "▣", pen: "✎", package: "▣", userCheck: "☑", building: "▥",
  truck: "▰", hardhat: "◒", settings: "⚙", search: "⌕", filter: "≡", arrow: "→",
  mobile: "▯", globe: "◎", database: "▤", workflow: "⇄", file: "▥", qr: "▦",
  lock: "◈", store: "▣", timer: "◴",
};

const roles = [
  { id: "system_admin", name: "System Admin", scope: "SaaS Owner", icon: icons.shield },
  { id: "admin", name: "Admin", scope: "Company Admin", icon: icons.settings },
  { id: "manager", name: "Maintenance Manager", scope: "Full KPI & control", icon: icons.dashboard },
  { id: "supervisor", name: "Supervisor", scope: "Assign & verify", icon: icons.userCheck },
  { id: "technician", name: "Technician", scope: "Execute work", icon: icons.wrench },
  { id: "requester", name: "Service Requester", scope: "Create & confirm", icon: icons.clipboard },
  { id: "executive", name: "Executive Viewer", scope: "Read-only dashboard", icon: icons.chart },
  { id: "store", name: "Store Keeper", scope: "Parts availability", icon: icons.store },
  { id: "labor", name: "Labor", scope: "Support tasks", icon: icons.hardhat },
  { id: "driver", name: "Driver", scope: "Vehicle reports", icon: icons.truck },
];

const statuses = [
  "New Request","Supervisor Review","Assigned","Diagnosis","Pending Approval","Waiting Parts",
  "Parts Issued","In Progress","Completed by Technician","Supervisor Verification","Requester Confirmation","Closed",
];

const workOrders = [
  {
    id: "WO-1001", asset: "Air Compressor SAMAA-COMP001", category: "Compressor",
    requester: "Operations Department", owner: "SAMAA Client", operator: "Site Operator",
    priority: "Critical", status: "Waiting Parts", technician: "Electrical Tech 01",
    supervisor: "Shift Supervisor A",
    issue: "Oil and filter replacement required with abnormal vibration during operation.",
    elapsed: "02h 45m", downtime: "01h 32m",
    parts: ["Oil Filter", "Mobil Engine Oil", "Air Filter"],
  },
  {
    id: "WO-1002", asset: "Forklift 10T M9BJ01199", category: "Forklift",
    requester: "Driver", owner: "Internal Fleet", operator: "Logistics Team",
    priority: "High", status: "Diagnosis", technician: "Hydraulic Tech 02",
    supervisor: "Workshop Supervisor",
    issue: "Hydraulic leak from controller area. Need inspection and spare parts identification.",
    elapsed: "00h 58m", downtime: "00h 41m",
    parts: ["Hydraulic Seal Kit", "Hose", "Hydraulic Oil"],
  },
  {
    id: "WO-1003", asset: "FRAC Tank SAH-FT-220", category: "Tank",
    requester: "Dispatch", owner: "Rental Fleet", operator: "Dispatch Department",
    priority: "Medium", status: "Supervisor Verification", technician: "Fabrication Team",
    supervisor: "Fabrication Supervisor",
    issue: "Internal pipe support installation and metal sheet defect repair.",
    elapsed: "08h 20m", downtime: "00h 00m",
    parts: ["3 inch Pipe 150 PSI - 6 pcs", "Sheet Metal", "Welding Rod"],
  },
];

const modules = [
  { name: "Work Orders", icon: icons.clipboard, desc: "Request, assign, diagnose, approve, execute, verify, close." },
  { name: "Assets & QR", icon: icons.scan, desc: "Owner, operator, location, maintenance history, QR access." },
  { name: "Spare Parts", icon: icons.boxes, desc: "Request, availability, issue, receipt confirmation." },
  { name: "Technicians", icon: icons.users, desc: "Skills, workload, productivity, time tracking." },
  { name: "Notifications", icon: icons.bell, desc: "Real-time updates, delay alerts, escalation." },
  { name: "KPI Dashboard", icon: icons.chart, desc: "MTTR, downtime, availability, SLA, cost." },
  { name: "Audit Trail", icon: icons.lock, desc: "Every action saved with user, time, and status change." },
  { name: "Reports", icon: icons.file, desc: "PDF/Excel export for management and clients." },
];

const kpis = [
  { label: "Open Work Orders", value: "37", trend: "+8 today", icon: icons.clipboard },
  { label: "Avg. Response Time", value: "18 min", trend: "Target 15 min", icon: icons.clock },
  { label: "PM Compliance", value: "91%", trend: "+6% monthly", icon: icons.check },
  { label: "Waiting Parts", value: "11", trend: "3 critical", icon: icons.alert },
];

const pricing = [
  { name: "Starter", price: "499 SAR", desc: "For small workshops", features: ["5 users", "100 assets", "Work Orders", "Basic dashboard", "QR codes"] },
  { name: "Professional", price: "1,499 SAR", desc: "For growing maintenance teams", features: ["25 users", "1,000 assets", "Inventory", "SLA", "Reports", "Mobile app"] },
  { name: "Enterprise", price: "Custom", desc: "For large companies", features: ["Unlimited users", "Multi-sites", "API integration", "Custom workflows", "Priority support"] },
];

function Button({ children, onClick, variant = "solid", className = "", size = "md" }: any) {
  const base = "inline-flex items-center justify-center rounded-xl font-semibold transition active:scale-[.98]";
  const sizes = size === "lg" ? "px-6 py-3 text-base" : size === "sm" ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm";
  const styles = variant === "outline" ? "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50" : "bg-slate-900 text-white hover:bg-slate-800";
  return <button onClick={onClick} className={`${base} ${sizes} ${styles} ${className}`}>{children}</button>;
}

function Card({ children, className = "" }: any) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function Badge({ children, tone = "default" }: any) {
  const map: any = {
    default: "bg-slate-100 text-slate-700", critical: "bg-red-100 text-red-700",
    high: "bg-orange-100 text-orange-700", medium: "bg-blue-100 text-blue-700",
    success: "bg-emerald-100 text-emerald-700", dark: "bg-slate-900 text-white",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${map[tone] || map.default}`}>{children}</span>;
}

function Landing({ onOpenApp }: any) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <nav className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm text-xl">{icons.wrench}</div>
            <div>
              <div className="text-xl font-bold tracking-tight">{productName}</div>
              <div className="text-xs text-slate-500">Maintenance Operations SaaS</div>
            </div>
          </div>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#features">Features</a><a href="#workflow">Workflow</a><a href="#pricing">Pricing</a>
            <Button onClick={onOpenApp}>Open App Demo</Button>
          </div>
          <Button onClick={onOpenApp} className="md:hidden">Open</Button>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_.95fr] lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-5 flex flex-wrap gap-2">
            <Badge tone="dark">Multi-Tenant SaaS</Badge><Badge>Web + Mobile</Badge><Badge>Built for Field Teams</Badge>
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            Fast maintenance management for workshops, assets, technicians, and supervisors.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A practical CMMS platform designed to replace WhatsApp, Excel, and paperwork with real-time work orders, QR assets, spare parts flow, technician updates, and executive KPIs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={onOpenApp} size="lg">Launch App Prototype <span className="ml-2">{icons.arrow}</span></Button>
            <Button variant="outline" size="lg">View Business Website</Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4"><b>For Technicians</b><br />Simple mobile tasks.</div>
            <div className="rounded-2xl bg-slate-50 p-4"><b>For Supervisors</b><br />Live assignment board.</div>
            <div className="rounded-2xl bg-slate-50 p-4"><b>For Managers</b><br />Accurate KPIs.</div>
          </div>
        </div>
        <div className="rounded-[2rem] border bg-slate-50 p-4 shadow-xl">
          <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div><div className="text-sm text-slate-500">Live Dashboard</div><div className="text-2xl font-bold">Workshop Control Center</div></div>
              <Badge tone="success">Online</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-2xl border p-4">
                  <div className="text-xl text-slate-500">{k.icon}</div>
                  <div className="mt-3 text-3xl font-black">{k.value}</div>
                  <div className="text-sm text-slate-500">{k.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-slate-900 p-4 text-white">
              <div className="flex items-center gap-2 text-sm text-slate-300"><span>{icons.workflow}</span> Current workflow</div>
              <div className="mt-3 grid gap-2">
                {["Requester created WO", "Supervisor assigned technician", "Technician diagnosed", "Store responding parts", "Supervisor verification"].map((x) => (
                  <div key={x} className="flex items-center gap-2 rounded-xl bg-white/10 p-2 text-sm"><span>{icons.check}</span> {x}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 max-w-2xl"><h2 className="text-3xl font-black">Everything needed for the MVP</h2><p className="mt-2 text-slate-600">Designed to start simple and scale into a full CMMS/EAM platform.</p></div>
          <div className="grid gap-4 md:grid-cols-4">
            {modules.map((m) => <Card key={m.name}><div className="p-5"><div className="text-2xl text-slate-700">{m.icon}</div><h3 className="mt-4 font-bold">{m.name}</h3><p className="mt-2 text-sm text-slate-600">{m.desc}</p></div></Card>)}
          </div>
        </div>
      </section>
      <section id="workflow" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between gap-4"><div><h2 className="text-3xl font-black">Real maintenance workflow</h2><p className="mt-2 text-slate-600">From service request to requester signature and feedback.</p></div><Badge>Timestamped by minute</Badge></div>
        <div className="grid gap-2 md:grid-cols-4 lg:grid-cols-6">
          {statuses.map((s, i) => <div key={s} className="rounded-2xl border bg-white p-4"><div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">{i + 1}</div><div className="text-sm font-semibold">{s}</div></div>)}
        </div>
      </section>
      <section id="pricing" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 max-w-2xl"><h2 className="text-3xl font-black">SaaS pricing model</h2><p className="mt-2 text-slate-600">Ready for monthly subscription, setup fees, training, and enterprise customization.</p></div>
          <div className="grid gap-4 md:grid-cols-3">
            {pricing.map((p) => <Card key={p.name} className="rounded-3xl"><div className="p-6"><h3 className="text-xl font-bold">{p.name}</h3><div className="mt-2 text-3xl font-black">{p.price}</div><p className="mt-2 text-sm text-slate-500">{p.desc}</p><div className="mt-5 space-y-2">{p.features.map(f => <div key={f} className="flex items-center gap-2 text-sm"><span>{icons.check}</span> {f}</div>)}</div><Button className="mt-6 w-full">Start</Button></div></Card>)}
          </div>
        </div>
      </section>
    </div>
  );
}

function AppDashboard({ onBack }: any) {
  const [activeRole, setActiveRole] = useState("manager");
  const [activeWO, setActiveWO] = useState(workOrders[0]);
  const [mobileView, setMobileView] = useState(false);
  const role = useMemo(() => roles.find((r) => r.id === activeRole), [activeRole]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm text-xl">{icons.wrench}</div>
            <div><h1 className="text-xl font-bold tracking-tight">{productName} App</h1><p className="text-sm text-slate-500">Ready MVP Demo</p></div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setMobileView(!mobileView)}><span className="mr-2">{icons.mobile}</span> {mobileView ? "Web View" : "Mobile View"}</Button>
            <Button onClick={onBack}><span className="mr-2">{icons.globe}</span> Website</Button>
          </div>
        </div>
      </header>
      <main className={`mx-auto grid max-w-7xl gap-5 px-5 py-6 ${mobileView ? "lg:grid-cols-[390px_1fr]" : "lg:grid-cols-[270px_1fr]"}`}>
        <aside className="space-y-4">
          <Card><div className="p-4"><div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600"><span>{icons.users}</span> User Roles</div><div className="space-y-2">
            {roles.map((r) => {
              const active = r.id === activeRole;
              return <button key={r.id} onClick={() => setActiveRole(r.id)} className={`w-full rounded-xl p-3 text-left transition ${active ? "bg-slate-900 text-white shadow" : "bg-white hover:bg-slate-100"}`}><div className="flex items-center gap-3"><span className="text-lg">{r.icon}</span><div><div className="text-sm font-semibold">{r.name}</div><div className={`text-xs ${active ? "text-slate-300" : "text-slate-500"}`}>{r.scope}</div></div></div></button>;
            })}
          </div></div></Card>
          <Card><div className="p-4"><div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600"><span>{icons.database}</span> Scalable Database</div><div className="space-y-2 text-xs text-slate-600">
            {["companies", "users", "roles", "assets", "asset_responsibility", "work_orders", "status_history", "diagnosis", "spare_part_requests", "inventory", "signatures", "audit_logs"].map(t => <div key={t} className="rounded-lg bg-slate-100 px-3 py-2 font-mono">{t}</div>)}
          </div></div></Card>
        </aside>
        <section className="space-y-5">
          <div className="grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
            <Card><div className="p-5">
              <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div><div className="flex items-center gap-2 text-sm text-slate-500"><span>{role?.icon}</span> Current Role</div><h2 className="mt-1 text-2xl font-bold">{role?.name} Dashboard</h2><p className="text-sm text-slate-500">Same platform, different permissions and screens for each user.</p></div>
                <div className="flex gap-2"><Button><span className="mr-2">{icons.plus}</span> New Request</Button><Button variant="outline"><span className="mr-2">{icons.qr}</span> Scan QR</Button></div>
              </div>
              <div className="grid gap-3 md:grid-cols-4">{kpis.map((k) => <div key={k.label} className="rounded-2xl border bg-white p-4"><div className="flex items-center justify-between"><span className="text-xl text-slate-500">{k.icon}</span><span className="text-xs text-slate-400">Live</span></div><div className="mt-4 text-2xl font-bold">{k.value}</div><div className="text-xs text-slate-500">{k.label}</div><div className="mt-2 text-xs font-medium text-slate-600">{k.trend}</div></div>)}</div>
            </div></Card>
            <Card><div className="p-5"><div className="mb-4 flex items-center justify-between"><h3 className="font-bold">MVP Modules</h3><Badge>Phase 1</Badge></div><div className="grid gap-3">{modules.slice(0, 6).map((m) => <div key={m.name} className="flex items-start gap-3 rounded-xl bg-slate-100 p-3"><span className="mt-0.5 text-xl text-slate-600">{m.icon}</span><div><div className="text-sm font-semibold">{m.name}</div><div className="text-xs text-slate-500">{m.desc}</div></div></div>)}</div></div></Card>
          </div>
          <div className={`grid gap-5 ${mobileView ? "lg:grid-cols-[390px_1fr]" : "lg:grid-cols-[.9fr_1.1fr]"}`}>
            <Card className={mobileView ? "mx-auto w-full max-w-[390px] border-8 border-slate-900" : ""}>
              <div className="p-5"><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-bold">{mobileView ? "Technician Mobile" : "Work Orders"}</h3><div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-500"><span>{icons.search}</span> Search</div></div><div className="space-y-3">
                {workOrders.map((wo) => <button key={wo.id} onClick={() => setActiveWO(wo)} className={`w-full rounded-2xl border p-4 text-left transition hover:bg-slate-50 ${activeWO.id === wo.id ? "border-slate-900 bg-slate-50" : "bg-white"}`}><div className="flex items-start justify-between gap-3"><div><div className="font-semibold">{wo.id}</div><div className="text-sm text-slate-600">{wo.asset}</div></div><span className="text-slate-400">{icons.arrow}</span></div><div className="mt-3 flex flex-wrap gap-2"><Badge tone={wo.priority === "Critical" ? "critical" : wo.priority === "High" ? "high" : "medium"}>{wo.priority}</Badge><Badge>{wo.status}</Badge></div>{mobileView && <div className="mt-3 grid grid-cols-2 gap-2"><Button size="sm"><span className="mr-1">{icons.timer}</span> Start</Button><Button size="sm" variant="outline"><span className="mr-1">{icons.camera}</span> Photo</Button></div>}</button>)}
              </div></div>
            </Card>
            <Card><div className="p-5">
              <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div><div className="text-sm font-semibold text-slate-500">{activeWO.id}</div><h3 className="text-xl font-bold">{activeWO.asset}</h3><p className="mt-1 text-sm text-slate-600">{activeWO.issue}</p></div>
                <Badge tone={activeWO.priority === "Critical" ? "critical" : activeWO.priority === "High" ? "high" : "medium"}>{activeWO.priority}</Badge>
              </div>
              <div className="grid gap-3 md:grid-cols-4"><div className="rounded-xl bg-slate-100 p-3 text-sm"><b>Owner:</b><br />{activeWO.owner}</div><div className="rounded-xl bg-slate-100 p-3 text-sm"><b>Operator:</b><br />{activeWO.operator}</div><div className="rounded-xl bg-slate-100 p-3 text-sm"><b>Elapsed:</b><br />{activeWO.elapsed}</div><div className="rounded-xl bg-slate-100 p-3 text-sm"><b>Downtime:</b><br />{activeWO.downtime}</div></div>
              <div className="mt-5"><h4 className="mb-3 font-bold">Workflow Timeline</h4><div className="grid gap-2">{statuses.map((s, idx) => { const activeIdx = statuses.indexOf(activeWO.status); const done = idx <= activeIdx; return <div key={s} className="flex items-center gap-3 rounded-xl bg-white p-2"><div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${done ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"}`}>{idx + 1}</div><div className={`text-sm ${done ? "font-semibold text-slate-900" : "text-slate-400"}`}>{s}</div>{done && <div className="ml-auto text-xs text-slate-500">time saved</div>}</div>; })}</div></div>
              <div className="mt-5"><h4 className="mb-3 font-bold">Required Parts</h4><div className="flex flex-wrap gap-2">{activeWO.parts.map(p => <Badge key={p}>{p}</Badge>)}</div></div>
              <div className="mt-5 grid gap-3 md:grid-cols-5"><Button variant="outline"><span className="mr-2">{icons.camera}</span> Photo</Button><Button variant="outline"><span className="mr-2">{icons.pen}</span> Diagnose</Button><Button variant="outline"><span className="mr-2">{icons.package}</span> Parts</Button><Button variant="outline"><span className="mr-2">{icons.userCheck}</span> Verify</Button><Button><span className="mr-2">{icons.check}</span> Close</Button></div>
            </div></Card>
          </div>
          <Card><div className="p-5"><h3 className="mb-4 text-lg font-bold">Ready for Expansion</h3><div className="grid gap-3 md:grid-cols-4">
            {["Multi-company tenants", "Custom roles", "Dynamic fields", "Custom workflow status", "SLA rules", "RCA & failure codes", "Budget & cost centers", "API integrations", "Offline mobile mode", "GPS & fleet", "Power BI", "AI predictive maintenance"].map((item) => <div key={item} className="rounded-2xl border bg-white p-4 text-sm font-medium text-slate-700">{item}</div>)}
          </div></div></Card>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  return view === "landing" ? <Landing onOpenApp={() => setView("app")} /> : <AppDashboard onBack={() => setView("landing")} />;
}
