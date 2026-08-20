import { useState, type ComponentType, type SVGProps } from "react";
import { Button } from "@acko/button";
import { Typography } from "@acko/typography";
import { ArrowLeft, ChevronDown, Close1, Tick } from "@acko/icons";
import "./comparison.css";

// The generated icon types fall back to a bare `string` alias when their
// source .svg files aren't shipped with the package, so we re-type them here
// to match the actual runtime React components (svgr output).
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
const TickIcon = Tick as unknown as IconComponent;
// `Close` (no suffix) is a circled X — visually inconsistent with the plain
// `Tick` stroke. `Close1` is the plain X glyph, matching Tick's weight/style.
const CloseIcon = Close1 as unknown as IconComponent;
const ChevronDownIcon = ChevronDown as unknown as IconComponent;

type PlanId = "lite" | "health";

type Plan = {
  id: PlanId;
  name: string;
  priceMain: string;
  priceSuffix: string;
};

type RowValue =
  | { kind: "text"; text: string }
  | { kind: "icon"; included: boolean };

type ComparisonRow = {
  title: string;
  description: string;
  linkLabel?: string;
  values: [RowValue, RowValue];
};

const plans: Plan[] = [
  { id: "lite", name: "Platinum Lite Health", priceMain: "₹833", priceSuffix: "/mo" },
  { id: "health", name: "Platinum Health", priceMain: "₹1,000", priceSuffix: "/mo" },
];

const comparisonRows: ComparisonRow[] = [
  {
    title: "Sum insured",
    description:
      "This is how much your plan will cover for hospitalisation across your whole family",
    values: [{ kind: "text", text: "₹50 lakh" }, { kind: "text", text: "₹1 crore" }],
  },
  {
    title: "Health evaluation",
    description:
      "We evaluate the health of all members you want to cover so we can recommend the best coverage for your family.",
    linkLabel: "See less",
    values: [
      { kind: "text", text: "Required only for members with health conditions" },
      { kind: "text", text: "Required for all members" },
    ],
  },
  {
    title: "Specific illness waiting period",
    description:
      "For certain conditions, like diabetes or joint replacement, there’s a waiting period before your plan..",
    linkLabel: "See more",
    values: [{ kind: "text", text: "2 years" }, { kind: "text", text: "None" }],
  },
  {
    title: "In patient hospitalisation",
    description:
      "This covers all costs for hospital stays due to illness, accidents, or critical conditions. Your family i...",
    linkLabel: "See more",
    values: [
      { kind: "icon", included: true },
      { kind: "icon", included: true },
    ],
  },
  {
    title: "Consumables covered",
    description:
      "Consumables can make up 15% of your bill. These include things like gloves, syringes, and even hospital admin fees. With our plan, we cover it all.",
    linkLabel: "Know more",
    values: [
      { kind: "icon", included: true },
      { kind: "icon", included: true },
    ],
  },
  {
    title: "Emergency air ambulance",
    description:
      "We cover the cost of air ambulance services if any family member needs urgent transportation to a hospital by plane or helicopter. This applies in case of a life-threatening condition.",
    linkLabel: "Know more",
    values: [
      { kind: "icon", included: true },
      { kind: "icon", included: true },
    ],
  },
  {
    title: "Free doctor teleconsultation",
    description: "Consult a doctor anytime through the ACKO app. It’s completely free.",
    linkLabel: "Know more",
    values: [
      { kind: "icon", included: true },
      { kind: "icon", included: false },
    ],
  },
];

function ComparisonValue({ value }: { value: RowValue }) {
  if (value.kind === "text") {
    return (
      <Typography
        as="span"
        scale="sm"
        emphasis="normal"
        align="center"
        className="cmp-value cmp-value--text"
      >
        {value.text}
      </Typography>
    );
  }

  const Icon = value.included ? TickIcon : CloseIcon;
  return (
    <div className="cmp-value cmp-value--icon">
      <Icon
        aria-label={value.included ? "Covered" : "Not covered"}
        role="img"
        className={
          value.included
            ? "cmp-status cmp-status--included"
            : "cmp-status cmp-status--excluded"
        }
      />
    </div>
  );
}

function PlanSwitcherHeader() {
  return (
    <div className="cmp-chrome">
      <header className="cmp-header">
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Go back"
          iconLeft={<ArrowLeft />}
          className="cmp-back-btn"
        >
          Go back
        </Button>
      </header>
      <div className="cmp-switcher" role="row">
        <Typography
          as="span"
          scale="sm"
          emphasis="bold"
          role="columnheader"
          className="cmp-switcher__active"
        >
          {plans[0].name}
        </Typography>
        <span className="cmp-divider cmp-divider--switcher" aria-hidden="true" />
        <span className="cmp-switcher__trigger" role="columnheader">
          <Typography as="span" scale="sm" emphasis="bold">
            {plans[1].name}
          </Typography>
          <ChevronDownIcon aria-hidden="true" className="cmp-switcher__chevron" />
        </span>
      </div>
    </div>
  );
}

function PlanComparisonGrid({
  selectedPlan,
  onSelect,
}: {
  selectedPlan: PlanId;
  onSelect: (planId: PlanId) => void;
}) {
  return (
    <section className="cmp-page" aria-label="Compare health insurance plans">
      <PlanSwitcherHeader />

      <div className="cmp-content">
        {comparisonRows.map((row) => (
          <div className="cmp-section" key={row.title}>
            <div className="cmp-section__header">
              <Typography as="h3" scale="base" emphasis="bold">
                {row.title}
              </Typography>
              <Typography as="p" scale="xs" emphasis="normal" color="secondary">
                {row.description}
                {row.linkLabel ? (
                  <>
                    {" "}
                    <button className="cmp-link" type="button">
                      {row.linkLabel}
                    </button>
                  </>
                ) : null}
              </Typography>
            </div>
            <div className="cmp-values">
              <ComparisonValue value={row.values[0]} />
              <span className="cmp-divider cmp-divider--value" aria-hidden="true" />
              <ComparisonValue value={row.values[1]} />
            </div>
          </div>
        ))}
      </div>

      <div className="cmp-footer">
        <div className="cmp-footer__inner">
          {plans.map((plan) => (
            <div className="cmp-footer__plan" key={plan.id}>
              <p className="cmp-price">
                <Typography as="span" scale="base" emphasis="bold">
                  {plan.priceMain}
                </Typography>
                <Typography as="span" scale="2xs" emphasis="normal" color="secondary">
                  {plan.priceSuffix}
                </Typography>
              </p>
              <Button
                variant={plan.id === selectedPlan ? "primary" : "secondary"}
                size="sm"
                fullWidth
                onClick={() => onSelect(plan.id)}
              >
                Select
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("lite");

  return (
    <main className="cmp-viewport">
      <div className="cmp-shell">
        <PlanComparisonGrid selectedPlan={selectedPlan} onSelect={setSelectedPlan} />
      </div>
    </main>
  );
}

export default App;
