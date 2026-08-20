## PlanComparisonGrid
- **Type:** MISSING
- **Screen:** comparison (image-31f8e43a-a664-44a6-8ded-9d3cb46bf8df.png)
- **What it is:** A side-by-side health-plan comparison grid with grouped coverage rows, availability indicators, price columns, and plan-select actions.
- **Closest @acko component:** Table
- **Why it didn't fit:** The available table is not designed for the screen's sticky mobile pricing footer, plan headers, per-row explanatory copy, and responsive comparison layout.
- **Props sketch:** `plans: Plan[]; sections: ComparisonSection[]; onSelect: (planId: string) => void`.
- **Reuse potential:** HIGH — multiple insurance journeys need to compare plans and coverage.

## PlanSwitcherHeader
- **Type:** VARIANT-GAP
- **Screen:** comparison (image-31f8e43a-a664-44a6-8ded-9d3cb46bf8df.png)
- **What it is:** Sticky row below the back button showing the active plan as a purple pill and the comparison plan as plain text with a chevron, used to indicate/change which two plans are being compared.
- **Closest @acko component:** Dropdown, Tabs
- **Why it didn't fit:** `Dropdown` always renders a labelled input-style box (border, fill, helper text slot) and `Tabs` renders an equal-weight pill group — neither supports one side as an unboxed "active" chip and the other as a bare text+chevron trigger with no input chrome.
- **Props sketch:** `activePlan: Plan; comparePlan: Plan; onChangeComparePlan?: (planId: string) => void`.
- **Reuse potential:** MEDIUM — any plan-vs-plan comparison screen would reuse this header pattern.
