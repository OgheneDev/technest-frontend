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
    if (trueCount === 5) return { strength: 'Strong', color: 'bg-green-500' };
    if (trueCount >= 3) return { strength: 'Medium', color: 'bg-yellow-500' };
    return { strength: 'Weak', color: 'bg-red-500' };
  };

  return (
    <div className="flex gap-1 items-center">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex-1 h-1.5">
          <div
            className='h-full rounded-full transition-all duration-300 bg-gray-200'
          />
        </div>
      ))}
      <span className="text-xs ml-2">{getPasswordStrength().strength}</span>
    </div>
  );
};

export default PasswordStrength;
