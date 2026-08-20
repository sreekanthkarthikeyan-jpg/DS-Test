import { useState, type ComponentType, type SVGProps } from "react";
import { Button } from "@acko/button";
import { Typography } from "@acko/typography";
import { ArrowLeft, ChevronDown, Close, Tick } from "@acko/icons";
import "./comparison.css";

// The generated icon types fall back to a bare `string` alias when their
// source .svg files aren't shipped with the package, so we re-type them here
// to match the actual runtime React components (svgr output).
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
const TickIcon = Tick as unknown as IconComponent;
const CloseIcon = Close as unknown as IconComponent;
const ChevronDownIcon = ChevronDown as unknown as IconComponent;

type PlanId = "lite" | "health";

type Plan = {
  id: PlanId;
  name: string;
  price: string;
};

type RowValue =
  | { kind: "chip"; text: string }
  | { kind: "icon"; included: boolean };

type ComparisonRow = {
  title: string;
  description: string;
  linkLabel?: string;
  values: [RowValue, RowValue];
};

const plans: Plan[] = [
  { id: "lite", name: "Platinum Lite Health", price: "₹833/mo" },
  { id: "health", name: "Platinum Health", price: "₹1,000/mo" },
];

const comparisonRows: ComparisonRow[] = [
  {
    title: "Sum insured",
    description:
      "This is how much your plan will cover for hospitalisation across your whole family.",
    values: [
      { kind: "chip", text: "₹50 lakh" },
      { kind: "chip", text: "₹1 crore" },
    ],
  },
  {
    title: "Health evaluation",
    description:
      "We evaluate the health of all members you want to cover so we can recommend the best coverage for your family.",
    linkLabel: "See less",
    values: [
      { kind: "chip", text: "Required only for members with health conditions" },
      { kind: "chip", text: "Required for all members" },
    ],
  },
  {
    title: "Specific illness waiting period",
    description:
      "For certain conditions, like diabetes or joint replacement, there’s a waiting period before your plan.",
    linkLabel: "See more",
    values: [
      { kind: "chip", text: "2 years" },
      { kind: "chip", text: "None" },
    ],
  },
  {
    title: "In patient hospitalisation",
    description:
      "This covers all costs for hospital stays due to illness, accidents, or critical conditions. Your family i…",
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
  if (value.kind === "chip") {
    return (
      <div className="cmp-value cmp-value--chip">
        <Typography variant="caption" weight="medium" align="center">
          {value.text}
        </Typography>
      </div>
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

function PlanSwitcherHeader({ selectedPlan }: { selectedPlan: PlanId }) {
  return (
    <div className="cmp-chrome">
      <header className="cmp-header">
        <Button
          variant="ghost"
          size="xs"
          iconOnly
          aria-label="Go back"
          iconLeft={<ArrowLeft />}
        >
          Go back
        </Button>
      </header>
      <div className="cmp-switcher" role="row">
        <span
          className="cmp-switcher__active"
          role="columnheader"
          aria-current={selectedPlan === "lite" ? "true" : undefined}
        >
          <Typography variant="label-sm" weight="semibold" color="brand">
            {plans[0].name}
          </Typography>
        </span>
        <span className="cmp-switcher__trigger" role="columnheader">
          <Typography variant="label-sm" weight="semibold">
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
      <PlanSwitcherHeader selectedPlan={selectedPlan} />

      <div className="cmp-content">
        {comparisonRows.map((row) => (
          <div className="cmp-section" key={row.title}>
            <div className="cmp-section__header">
              <Typography variant="heading-sm" weight="semibold">
                {row.title}
              </Typography>
              <Typography variant="caption" color="secondary">
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
              <ComparisonValue value={row.values[1]} />
            </div>
          </div>
        ))}
      </div>

      <div className="cmp-footer">
        {plans.map((plan) => (
          <div className="cmp-footer__plan" key={plan.id}>
            <Typography variant="label-md" weight="semibold" align="center">
              {plan.price}
            </Typography>
            <Button
              variant={plan.id === selectedPlan ? "primary" : "secondary"}
              size="xs"
              fullWidth
              onClick={() => onSelect(plan.id)}
            >
              Select
            </Button>
          </div>
        ))}
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
