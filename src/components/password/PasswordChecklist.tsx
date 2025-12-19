import React from "react";
import { Check, X } from "lucide-react";

interface PasswordChecks {
  minLength: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hasUpper: boolean;
  hasLower: boolean;
}

const PasswordChecklist = ({
  passwordChecks,
}: {
  passwordChecks: PasswordChecks;
}) => {
  const requirements = [
    {
      label: "At least 8 characters",
      met: passwordChecks.minLength,
    },
    {
      label: "Contains a number",
      met: passwordChecks.hasNumber,
    },
    {
      label: "Contains special character",
      met: passwordChecks.hasSpecial,
    },
    {
      label: "Contains uppercase & lowercase",
      met: passwordChecks.hasUpper && passwordChecks.hasLower,
    },
  ];

  return (
    <div className="space-y-2">
      <div className="text-xs text-zinc-400 mb-2">Password requirements</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {requirements.map((req, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 text-xs transition-colors duration-200 ${
              req.met ? "text-emerald-400" : "text-zinc-500"
            }`}
          >
            <div
              className={`flex-shrink-0 rounded-full transition-all duration-200 ${
                req.met
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-zinc-800 text-zinc-600"
              }`}
            >
              {req.met ? (
                <Check className="h-4 w-4 p-0.5" />
              ) : (
                <X className="h-4 w-4 p-0.5" />
              )}
            </div>
            <span className="leading-tight">{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordChecklist;
