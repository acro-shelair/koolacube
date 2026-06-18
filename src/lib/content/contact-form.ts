/**
 * Admin-editable configuration for the contact form. Client-safe (data + types).
 * The set of fields is fixed (it maps to the `messages` table columns); the admin
 * controls labels, dropdown/checkbox options, which optional fields show, whether
 * they're required, and the surrounding copy.
 */

export type OptionalKey =
  | "business"
  | "startDate"
  | "duration"
  | "product"
  | "volume"
  | "power"
  | "message";

export type OptionalFieldCfg = {
  key: OptionalKey;
  label: string;
  visible: boolean;
  required: boolean;
};

export type ContactFormConfig = {
  nameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  suburbLabel: string;
  needLabel: string;
  needOptions: string[];
  modeLegend: string;
  modeOptions: string[];
  optionalFields: OptionalFieldCfg[];
  accessLegend: string;
  accessOptions: string[];
  acknowledgeText: string;
  acknowledgeRequired: boolean;
  submitLabel: string;
  successHeading: string;
  successText: string;
};

/** Fixed input type + placeholder per optional field (not admin-editable). */
export const OPTIONAL_FIELD_META: Record<
  OptionalKey,
  { type: "text" | "date" | "textarea"; placeholder?: string }
> = {
  business: { type: "text" },
  startDate: { type: "date" },
  duration: { type: "text", placeholder: "e.g. 3 months" },
  product: { type: "text", placeholder: "e.g. meat, dairy, produce" },
  volume: { type: "text", placeholder: "e.g. 6 pallets" },
  power: { type: "text", placeholder: "e.g. 240V 15A / 3-phase / unsure" },
  message: { type: "textarea" },
};

export const CONTACT_FORM_DEFAULT: ContactFormConfig = {
  nameLabel: "Name",
  phoneLabel: "Phone",
  emailLabel: "Email",
  suburbLabel: "Suburb / Site Location",
  needLabel: "Need",
  needOptions: ["Cold Room", "Freezer Room", "Dual Temp", "Unsure"],
  modeLegend: "Hire or Buy",
  modeOptions: ["Hire", "Buy"],
  optionalFields: [
    { key: "business", label: "Business Name", visible: true, required: false },
    { key: "startDate", label: "Required Start Date", visible: true, required: false },
    { key: "duration", label: "Expected Hire Duration", visible: true, required: false },
    { key: "product", label: "Product Stored", visible: true, required: false },
    { key: "volume", label: "Approximate Storage Volume", visible: true, required: false },
    { key: "power", label: "Existing Power Supply", visible: true, required: false },
    { key: "message", label: "Message", visible: true, required: false },
  ],
  accessLegend: "Site Access",
  accessOptions: ["Forklift", "Crane", "Truck Access", "Unsure"],
  acknowledgeText:
    "I understand Koolacube is focused on business, long-term hire and sales — not short-term party or event hire.",
  acknowledgeRequired: true,
  submitLabel: "Send Enquiry",
  successHeading: "Enquiry received.",
  successText:
    "Thanks — we'll be in touch shortly. For urgent matters call 1300 561 030.",
};
