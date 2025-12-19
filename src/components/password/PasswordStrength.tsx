import React from "react";

interface PasswordChecks {
  minLength: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hasUpper: boolean;
  hasLower: boolean;
}

interface PasswordStrengthProps {
  passwordChecks: PasswordChecks;
}

const PasswordStrength = ({ passwordChecks }: PasswordStrengthProps) => {
  const getPasswordStrength = () => {
    const checks = Object.values(passwordChecks);
    const trueCount = checks.filter(Boolean).length;

    if (trueCount === 5)
      return {
        strength: "Strong",
        color: "bg-emerald-500",
        textColor: "text-emerald-400",
        bars: 5,
      };
    if (trueCount >= 3)
      return {
        strength: "Medium",
        color: "bg-yellow-500",
        textColor: "text-yellow-400",
        bars: 3,
      };
    if (trueCount >= 1)
      return {
        strength: "Weak",
        color: "bg-red-500",
        textColor: "text-red-400",
        bars: 1,
      };
    return {
      strength: "Very Weak",
      color: "bg-red-500",
      textColor: "text-red-400",
      bars: 0,
    };
  };

  const strengthData = getPasswordStrength();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400">Password strength</span>
        <span className={`text-xs font-medium ${strengthData.textColor}`}>
          {strengthData.strength}
        </span>
      </div>
      <div className="flex gap-1.5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden"
          >
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                index < strengthData.bars
                  ? strengthData.color
                  : "bg-transparent"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
