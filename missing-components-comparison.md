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

## ComparePlanPicker
- **Type:** VARIANT-GAP
- **Screen:** comparison (Figma node 7151:1782, file VF9puH7VCD2DzhdT7g22u1) — bottom sheet opened from the plan-switcher chevron
- **What it is:** A single-select list ("Select plan to compare") where the checked option is shown as brand-purple text with a trailing checkmark and no visible control, and the unchecked option is plain primary-color text with no marker at all — separated by a dashed hairline. Full `role="radiogroup"`/`role="radio"` semantics with arrow-key roving (not just Tab) per the ARIA radio widget pattern.
- **Closest @acko component:** RadioGroup (`@acko/radio`)
- **Why it didn't fit:** `RadioGroup` always renders a circular dot (`.acko-radio-circle`/`.acko-radio-dot`) for every option and a mandatory visible group `label`; there's no variant that drops the circle in favor of color+trailing-check, and the group label would duplicate the bottom sheet's own title.
- **Props sketch:** `options: { id: string; name: string }[]; selectedId: string; onSelect: (id: string) => void` — rendered as `role="radio"` buttons (roving `tabIndex`, arrow-key navigation) inside a `role="radiogroup"` container, reusing `Typography` (`color="brand"`/`"primary"` — matching the purple "selected" convention used by Tabs/Chip/Radio/Checkbox elsewhere in the system, not `"success"`, which is reserved for outcome states) and the shared `Tick` icon rather than any new icon. Selection is conveyed by color + icon only — emphasis/weight never changes between states, per the DS's "never change font weight on selected state" rule.
- **Reuse potential:** MEDIUM — any single-select "pick one from a short list" bottom sheet (e.g. sort/filter pickers) would reuse this pattern.

## Focus-ring token gap (`--shadowFocusRing`)
- **Type:** VARIANT-GAP
- **Screen:** comparison (applies to `.cmp-switcher__trigger`, `.cmp-link`, `.cmp-plan-option` custom interactive elements)
- **What it is:** Custom (non-package) interactive elements need a `:focus-visible` ring. The design-system skill docs specify `box-shadow: var(--shadowFocusRing)`, but that custom property is **not defined anywhere** in the installed `@acko/tokens` package (`tokens.css`/`theme.css`) — several shipped components (`drawer.css`, `dialog.css`, `navbar.css`, `icon-tile.css`) reference it too, so their focus rings are silently no-ops in this package version.
- **Closest @acko component:** N/A — token definition gap, not a component gap.
- **Why it didn't fit:** Referencing an undefined custom property resolves to nothing (`box-shadow: ;`), i.e. no visible focus indicator at all — worse than doing nothing.
- **Fix applied:** Matched the pattern the *working* shipped components actually use — `@acko/css`'s own `button.css` (`.acko-button:focus-visible { box-shadow: 0 0 0 3px var(--borderFocus); }`) and `accordion.css` use a real, defined token (`--borderFocus`) in a box-shadow ring. Applied the same `box-shadow: 0 0 0 3px var(--borderFocus)` to all three custom elements instead of `outline:` or the undefined `--shadowFocusRing`.
- **Reuse potential:** HIGH — this is a package-level gap; worth flagging to the DS team so `--shadowFocusRing` gets defined (or the components get repointed to `--borderFocus`) upstream.

## Desktop table-column alignment
- **Type:** VARIANT-GAP
- **Screen:** comparison (applies to `.cmp-switcher`, every `.cmp-section`, and `.cmp-footer__inner` at `≥1024px`)
- **What it is:** On mobile/tablet each row (plan-switcher header, a feature's two values, the price+CTA footer) is an independently centered flex cluster — correct there since there's only one sensible place for content on a narrow screen. At desktop width that stops producing a real "table": a short-value row (a checkmark) and a long-sentence row center their content differently, so the plan-name headers, the per-row values, and the footer CTAs no longer land in the same vertical columns.
- **Closest @acko component:** Table
- **Why it didn't fit:** `Table`'s stretched edge-to-edge columns don't support the centered-cluster-with-divider visual from the Figma mock, and switching to it site-wide would mean rebuilding the sticky header/footer and the icon/text value cells from scratch (see the "PlanComparisonGrid"/"Centered value-row divider pattern" entries above).
- **Fix:** At `≥1024px` only, `.cmp-switcher`, `.cmp-section`, and `.cmp-footer__inner` all adopt the identical `grid-template-columns: 1.3fr 1fr 1fr` (label track + two equal plan tracks), so every row's plan-1/plan-2 columns share the same x-position edge to edge down the page — the switcher and footer have no label content, so their first track is simply left empty, matching the label column's width in the rows below. The literal hairline dividers (`.cmp-divider--switcher`/`.cmp-divider--value`) are hidden and replaced by an absolutely-positioned `::after` rule centered at `left: 50%` of the shared 2-column value area, so the seam is guaranteed to sit at the same x-position on every row regardless of that row's content length. The ratio is fixed in `fr` units (not px) and does not change between 1024–1280px, matching layout.md's "only typography scales between 1024 and 1280" rule; the existing `max-width: 1280px` cap keeps the table from stretching edge-to-edge on ultra-wide monitors.
- **Reuse potential:** HIGH — any comparison/pricing table with a sticky header/footer would need the same "shared grid ratio across every row" treatment to render correctly past mobile.

## Bottom sheet chevron trigger
- **Type:** VARIANT-GAP
- **Screen:** comparison (Figma node 7140:1668 trigger → 7151:1782 sheet, file VF9puH7VCD2DzhdT7g22u1)
- **What it is:** The comparison plan name + chevron in the sticky switcher is now a real button that opens a `Drawer` (`side="bottom"`) bottom sheet; the chevron rotates 180° while open.
- **Closest @acko component:** Drawer (`@acko/drawer`)
- **Why it didn't fit perfectly:** `Drawer`'s `dismissible` prop couples three behaviours together (Escape key, backdrop-click, and rendering a header close ✕ button) with no way to get backdrop/Escape dismissal without also showing the ✕. The Figma bottom sheet only shows a grab handle, no ✕. Kept `dismissible` at its default (true) rather than overriding the component's internal header markup — the sheet shows a small close ✕ in addition to the grab handle, a minor, accessible deviation from the exact mock.
- **Props sketch:** N/A — used `Drawer` as-is (`side="bottom"`, `size="md"`), composing the title and picker list into its `children` slot instead of its `title` prop (so the heading could use the exact 20px/26px `xl` scale instead of the Drawer's fixed 18px built-in title style).
- **Reuse potential:** HIGH — `Drawer` with `side="bottom"` is the general bottom-sheet solution for this design system; only the coupled-dismissible quirk is worth a system-level follow-up.
