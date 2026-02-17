import React from "react";
import {
  CheckCircle,
  ErrorOutline,
  InfoOutlined,
  WarningAmber,
} from "@mui/icons-material";

const variantStyles = {
  success: {
    container:
      "bg-emerald-50 border-emerald-200 text-emerald-800",
    icon: "text-emerald-600",
  },
  error: {
    container:
      "bg-red-50 border-red-200 text-red-800",
    icon: "text-red-600",
  },
  info: {
    container:
      "bg-blue-50 border-blue-200 text-blue-800",
    icon: "text-blue-600",
  },
  warning: {
    container:
      "bg-amber-50 border-amber-200 text-amber-800",
    icon: "text-amber-600",
  },
};

const variantIcons = {
  success: CheckCircle,
  error: ErrorOutline,
  info: InfoOutlined,
  warning: WarningAmber,
};

export default function InlineAlert({ severity = "info", children, className = "" }) {
  const styles = variantStyles[severity] || variantStyles.info;
  const Icon = variantIcons[severity] || variantIcons.info;

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${styles.container} ${className}`}
      role="alert"
    >
      <Icon className={styles.icon} sx={{ fontSize: 20 }} />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}
