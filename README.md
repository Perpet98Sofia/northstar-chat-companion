# Northstar Support Deflection MVP

## Project Overview
Northstar Retail Co. is a mid-size e-commerce company whose support team is overwhelmed by repetitive tickets:
1. Order status ("Where is my order?")
2. Returns & refunds ("How do I return this?")
3. Stock availability ("Is this back in stock?")

Our 5 person pod was engaged for a 1-week sprint to deliver a **Support Deflection MVP**.  
The MVP reduces manual handling for at least two of these categories, proving the approach works.

---

## Deliverables
- **Working Prototype (MVP):** Demoable end-to-end, covering ≥2 ticket types.
- **Go-Live Readiness Note (1 page):** What works, what's broken, and what Northstar must do next.
- **Audit Trail:** Commit/edit log + board tasks, proving collaborative work.

---

## Charter Board – Tasks (≤4 hrs each)

| Task # | Title | Definition of Done | Est. Time |
|--------|-------|--------------------|-----------|
| 1 | Repo Setup | Repo created, branch naming convention documented in README | 2 hrs |
| 2 | Chatbot Skeleton | Bot responds to “hello” with canned reply | 3 hrs |
| 3 | Order Status API Integration | Bot returns shipping status from mock API | 4 hrs |
| 4 | Returns Flow | Decision tree guides user to return portal + refund ETA | 4 hrs |
| 5 | Stock Dashboard Stub | Page loads with placeholder inventory table | 4 hrs |
| 6 | Go-Live Note Draft | 1-page doc skeleton with sections (works/broken/next steps) | 2 hrs |
| 7 | Audit Logging Setup | Script exports commit log + board timestamps | 4 hrs |
| 8 | Mid-Sprint Audit Snapshot | Export log + board status, check contribution balance | 3 hrs |
| 9 | Chatbot Fallback Messages | Bot replies gracefully when query not recognized | 4 hrs |
| 10 | Final Delivery Package | Prototype + audit log + go-live note zipped + submitted | 4 hrs |

---

## Commit Convention
All commits follow the format:
<type>: <what changed> – <why it matters>

Examples:
- `feat: chatbot skeleton – enables baseline bot reply`
- `fix: API integration – corrected order status response`
- `docs: add go-live note template – clarifies handoff steps`

---

## Board Workflow
- Columns: Backlog → To Do → In Progress → Review → Done
- Status updates must be same-day as work.
- No task >4 hrs; each has a single checkable Definition of Done.


