import { Check, X } from 'lucide-react';

interface PasswordChecks {
  minLength: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hasUpper: boolean;
  hasLower: boolean;
}

const PasswordChecklist = ({ passwordChecks }: { passwordChecks: PasswordChecks }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center gap-2 text-xs">
        {passwordChecks.minLength ? 
          <Check className="h-4 w-4 text-green-500" /> : 
          <X className="h-4 w-4 text-red-500" />
        }
        At least 8 characters
      </div>
      <div className="flex items-center gap-2 text-xs">
        {passwordChecks.hasNumber ? 
          <Check className="h-4 w-4 text-green-500" /> : 
          <X className="h-4 w-4 text-red-500" />
        }
        Contains number
      </div>
      <div className="flex items-center gap-2 text-xs">
        {passwordChecks.hasSpecial ? 
          <Check className="h-4 w-4 text-green-500" /> : 
          <X className="h-4 w-4 text-red-500" />
        }
        Special character
      </div>
      <div className="flex items-center gap-2 text-xs">
        {passwordChecks.hasUpper && passwordChecks.hasLower ? 
          <Check className="h-4 w-4 text-green-500" /> : 
          <X className="h-4 w-4 text-red-500" />
        }
        Upper & lowercase
      </div>
    </div>
  );
};

export default PasswordChecklist;
