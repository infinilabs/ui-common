import type { FC } from "react";
import type { LucideProps } from "lucide-react";
import {
  Building2,
  Calendar,
  Clock,
  Globe,
  Hash,
  IdCard,
  Link,
  Mail,
  MapPin,
  Phone,
  Tag,
  Tags,
  User,
  Users,
} from "lucide-react";

// Curated static registry. Resolving data-driven icon names previously
// required `import * as LucideIcons from "lucide-react"`, which forces every
// consumer's bundler to keep the whole ~1700-icon library because the full
// namespace must exist at runtime. This registry covers the names entity
// data actually carries (plus the legacy alias map); unknown names keep the
// previous null behavior.
const REGISTRY: Record<string, FC<LucideProps>> = {
  Building2,
  Calendar,
  Clock,
  Globe,
  Hash,
  IdCard,
  Link,
  Mail,
  MapPin,
  Phone,
  Tag,
  Tags,
  User,
  Users,
};

const ALIAS: Record<string, string> = {
  user: "User",
  email: "Mail",
  mail: "Mail",
  phone: "Phone",
  datetime: "Calendar",
  date: "Calendar",
  time: "Clock",
  tags: "Tag",
};

export const getLucideIcon = (name?: string) => {
  if (!name) return null;
  const raw = name.trim();
  const mapped = ALIAS[raw];
  const pascal =
    mapped ?? raw.replace(/(^\w|-\w)/g, (s) => s.replace("-", "").toUpperCase());
  return REGISTRY[pascal] || null;
};
