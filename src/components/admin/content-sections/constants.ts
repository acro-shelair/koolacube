import {
  PhoneOff,
  Phone,
  User,
  Users,
  UserX,
  RefreshCw,
  Receipt,
  Clock,
  History,
  CalendarDays,
  Lightbulb,
  Zap,
  Wrench,
  Settings,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Banknote,
  ArrowRight,
  Store,
  TrendingUp,
  Info,
  Thermometer,
  Droplet,
  Building,
  Eye,
  Maximize2,
  Snowflake,
  Frown,
} from "lucide-react";

export const BEFORE_AFTER_ICON_OPTIONS = [
  { key: "phone-off", Icon: PhoneOff },
  { key: "phone", Icon: Phone },
  { key: "user", Icon: User },
  { key: "users", Icon: Users },
  { key: "user-x", Icon: UserX },
  { key: "refresh-cw", Icon: RefreshCw },
  { key: "receipt", Icon: Receipt },
  { key: "clock", Icon: Clock },
  { key: "history", Icon: History },
  { key: "calendar-days", Icon: CalendarDays },
  { key: "lightbulb", Icon: Lightbulb },
  { key: "zap", Icon: Zap },
  { key: "wrench", Icon: Wrench },
  { key: "settings", Icon: Settings },
  { key: "check-circle-2", Icon: CheckCircle2 },
  { key: "x-circle", Icon: XCircle },
  { key: "alert-triangle", Icon: AlertTriangle },
  { key: "shield-check", Icon: ShieldCheck },
  { key: "banknote", Icon: Banknote },
  { key: "arrow-right", Icon: ArrowRight },
  { key: "store", Icon: Store },
  { key: "trending-up", Icon: TrendingUp },
  { key: "thermometer", Icon: Thermometer },
  { key: "droplet", Icon: Droplet },
  { key: "building", Icon: Building },
  { key: "eye", Icon: Eye },
  { key: "maximize", Icon: Maximize2 },
  { key: "snowflake", Icon: Snowflake },
  { key: "frown", Icon: Frown },
] as const;

export const CONTRAST_ICONS = [
  { value: "warning", label: "Warning", Icon: AlertTriangle },
  { value: "check", label: "Check", Icon: CheckCircle2 },
  { value: "x", label: "X", Icon: XCircle },
  { value: "info", label: "Info", Icon: Info },
] as const;

export const CONTRAST_COLORS = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "amber", label: "Amber" },
] as const;

// Explicit Tailwind-palette hex values. Applied via inline `style` instead of
// `text-*`/`bg-*` classes so the colors never depend on Tailwind's content
// scanner / safelist emitting them.
export const CONTRAST_COLOR_HEX = {
  red: { c400: "#f87171", c500: "#ef4444", c800: "#991b1b", c900: "#7f1d1d" },
  green: { c400: "#4ade80", c500: "#22c55e", c800: "#166534", c900: "#14532d" },
  blue: { c400: "#60a5fa", c500: "#3b82f6", c800: "#1e40af", c900: "#1e3a8a" },
  amber: { c400: "#fbbf24", c500: "#f59e0b", c800: "#92400e", c900: "#78350f" },
} as const;

export type ContrastColorKey = keyof typeof CONTRAST_COLOR_HEX;

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function contrastStyles(color: string | undefined) {
  const key: ContrastColorKey =
    color && color in CONTRAST_COLOR_HEX ? (color as ContrastColorKey) : "amber";
  const c = CONTRAST_COLOR_HEX[key];
  return {
    text500: { color: c.c500 } as const,
    text400: { color: c.c400 } as const,
    dot: { backgroundColor: c.c500 } as const,
    tintBg: { backgroundColor: hexToRgba(c.c500, 0.2) } as const,
    badge: { backgroundColor: hexToRgba(c.c500, 0.2), color: c.c500 } as const,
    headerRender: {
      backgroundColor: hexToRgba(c.c900, 0.7),
      borderBottom: `1px solid ${hexToRgba(c.c800, 0.6)}`,
    } as const,
    headerEditor: {
      backgroundColor: hexToRgba(c.c900, 0.4),
      borderBottom: `1px solid ${hexToRgba(c.c800, 0.5)}`,
    } as const,
  };
}
