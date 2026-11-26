export interface TestimonialItem {
  id: string;
  name: string;
  quote: string;
  image?: string;
  verifiedForPublication: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "sandeep-patel",
    name: "Sandeep Patel",
    quote:
      "They listened & Their attention to detail made our system smoother and user-friendly, surpassing our expectations.",
    verifiedForPublication: false,
  },
  {
    id: "william-brandham",
    name: "William Brandham",
    quote:
      "A Really Good Job, All Aspects Of The Project Were Followed Step By Step And With Good Results",
    verifiedForPublication: false,
  },
  {
    id: "vicky-medikonda",
    name: "Vicky Medikonda",
    quote:
      "Super quick in development & We developed ERP & CRM their work is beyond our expectations.",
    verifiedForPublication: false,
  },
];
