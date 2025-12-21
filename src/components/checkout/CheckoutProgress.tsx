"use client";

import { Step, steps } from "@/types/checkout";

interface CheckoutProgressProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

export function CheckoutProgress({
  activeStep,
  setActiveStep,
}: CheckoutProgressProps) {
  return (
    <div className="mb-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 transition-all duration-500"
          style={{
            width: activeStep === 1 ? "0%" : activeStep === 2 ? "50%" : "100%",
          }}
        />

        {steps.map((step: Step) => (
          <div
            key={step.id}
            className="relative z-10 flex flex-col items-center"
          >
            <button
              type="button"
              onClick={() => step.id <= activeStep && setActiveStep(step.id)}
              disabled={step.id > activeStep}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                ${
                  activeStep === step.id
                    ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/50"
                    : step.id < activeStep
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                }
                ${
                  step.id <= activeStep
                    ? "cursor-pointer hover:scale-105"
                    : "cursor-not-allowed"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-950
              `}
            >
              <step.icon className="h-6 w-6" />
            </button>
            <span
              className={`text-sm font-medium ${
                activeStep === step.id
                  ? "text-emerald-400"
                  : step.id < activeStep
                  ? "text-emerald-400/70"
                  : "text-zinc-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
