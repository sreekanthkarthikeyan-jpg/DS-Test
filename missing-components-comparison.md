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
- **Screen:** comparison (Figma node 7140:1668, file VF9puH7VCD2DzhdT7g22u1)
- **What it is:** Sticky row below the back button showing the active plan as brand-gradient text and the comparison plan as plain medium text with a chevron-down, separated by a hairline divider, used to indicate which two plans are being compared.
- **Closest @acko component:** Dropdown, Tabs
- **Why it didn't fit:** `Dropdown` always renders a labelled input-style box (border, fill, helper text slot) and `Tabs` renders an equal-weight pill group — neither supports one side as a gradient-text label with no chrome and the other as a bare text+chevron trigger.
- **Props sketch:** `activePlan: Plan; comparePlan: Plan; onChangeComparePlan?: (planId: string) => void`.
- **Reuse potential:** MEDIUM — any plan-vs-plan comparison screen would reuse this header pattern.

## Centered value-row divider pattern
- **Type:** VARIANT-GAP
- **Screen:** comparison (Figma node 7140:1668, file VF9puH7VCD2DzhdT7g22u1)
- **What it is:** Every comparison row's two answers (text or check/cross icon) are centered as a cluster around a single 1px vertical hairline divider, rather than stretched into two edge-to-edge table columns.
- **Closest @acko component:** Table, Separator
- **Why it didn't fit:** `Table` assumes stretched, edge-aligned columns; `Separator` only does horizontal/vertical full-bleed dividers, not a divider sized to a centered inline cluster of mixed text/icon content.
- **Props sketch:** N/A — implemented as a small `.cmp-values` flex layout inside `PlanComparisonGrid`, reusing `Separator`-equivalent styling (`var(--separatorLine)`) rather than a new component.
- **Reuse potential:** MEDIUM — same pattern would recur in other plan/product comparison rows.
