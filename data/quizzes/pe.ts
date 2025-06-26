export type MCQ = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
};

export const peQuestions: MCQ[] = [
  {
    id: "q1",
    question: "What is the formula to calculate Enterprise Value (EV)?",
    options: [
      { id: "A", text: "Market Cap + Debt - Cash" },
      { id: "B", text: "Market Cap + Cash - Debt" },
      { id: "C", text: "EBITDA × Multiple" },
      { id: "D", text: "Net Income + Depreciation" },
      { id: "E", text: "Equity Value - Debt + Cash" },
    ],
    correctOptionId: "A",
  },
  {
    id: "q2",
    question:
      "Which multiple is most commonly used to value a mature private equity target?",
    options: [
      { id: "A", text: "P/E (Price/Earnings)" },
      { id: "B", text: "EV/EBITDA" },
      { id: "C", text: "EV/Sales" },
      { id: "D", text: "P/B (Price/Book)" },
      { id: "E", text: "P/CF (Price/Cash Flow)" },
    ],
    correctOptionId: "B",
  },
  {
    id: "q3",
    question:
      "When computing IRR in an LBO model, which cash flow should be used?",
    options: [
      { id: "A", text: "Equity cash flows to equity investors" },
      { id: "B", text: "Pre-tax cash flows to firm" },
      { id: "C", text: "Levered free cash flow" },
      { id: "D", text: "Net income" },
      { id: "E", text: "Operating cash flow" },
    ],
    correctOptionId: "A",
  },
  {
    id: "q4",
    question:
      "Which component is NOT included in WACC (Weighted Average Cost of Capital)?",
    options: [
      { id: "A", text: "Cost of Debt" },
      { id: "B", text: "Cost of Equity" },
      { id: "C", text: "Cost of Preferred Stock" },
      { id: "D", text: "Corporate Tax Rate" },
      { id: "E", text: "Cost of Retained Earnings" },
    ],
    correctOptionId: "E",
  },
  {
    id: "q5",
    question:
      "If a private equity fund invests $100M and exits for $180M after 5 years, what is the approximate multiple on invested capital (MOIC)?",
    options: [
      { id: "A", text: "1.8×" },
      { id: "B", text: "2.0×" },
      { id: "C", text: "1.2×" },
      { id: "D", text: "1.5×" },
      { id: "E", text: "2.8×" },
    ],
    correctOptionId: "A",
  },
  {
    id: "q6",
    question: "What is carried interest typically paid on?",
    options: [
      { id: "A", text: "Total capital commitments" },
      { id: "B", text: "Distributed profits above the hurdle rate" },
      { id: "C", text: "Management fees collected" },
      { id: "D", text: "Return of capital" },
      { id: "E", text: "Unrealized gains only" },
    ],
    correctOptionId: "B",
  },
  {
    id: "q7",
    question:
      "Which metric measures cash returned to LPs relative to paid-in capital?",
    options: [
      { id: "A", text: "TVPI (Total Value to Paid-In)" },
      { id: "B", text: "IRR" },
      { id: "C", text: "DPI (Distributions to Paid-In)" },
      { id: "D", text: "MOIC" },
      { id: "E", text: "PME (Public Market Equivalent)" },
    ],
    correctOptionId: "C",
  },
  {
    id: "q8",
    question:
      "In a standard waterfall, what must occur before GP receives carry?",
    options: [
      { id: "A", text: "Return of 100% of capital contributions" },
      { id: "B", text: "Achieve the hurdle/preferred return" },
      { id: "C", text: "Payment of management fees" },
      { id: "D", text: "LPs waive clawback rights" },
      { id: "E", text: "Realize at least one exit" },
    ],
    correctOptionId: "B",
  },
  {
    id: "q9",
    question:
      "How do you calculate hurdle/ preferred return for a given cash flow?",
    options: [
      { id: "A", text: "NPV of cash flows at hurdle rate = 0" },
      { id: "B", text: "Multiply LP contributed capital by hurdle rate" },
      { id: "C", text: "Sum of all capital calls times IRR" },
      { id: "D", text: "Average fund return minus management fee" },
      { id: "E", text: "Discount distributions at cost of equity" },
    ],
    correctOptionId: "B",
  },
  {
    id: "q10",
    question: "Which statement is true about TVPI vs DPI?",
    options: [
      { id: "A", text: "DPI includes unrealized gains" },
      { id: "B", text: "TVPI = DPI + RVPI" },
      { id: "C", text: "TVPI excludes distributions" },
      { id: "D", text: "DPI measures total value" },
      { id: "E", text: "RVPI measures realized profits" },
    ],
    correctOptionId: "B",
  },
];
