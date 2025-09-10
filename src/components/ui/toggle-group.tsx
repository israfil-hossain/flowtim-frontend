import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleGroupVariants = cva(
  "inline-flex items-center justify-center rounded-md bg-muted p-1",
  {
    variants: {
      variant: {
        default: "bg-muted",
        outline: "bg-transparent border border-input",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ToggleGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  type: "single" | "multiple";
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  type: "single",
});

interface ToggleGroupProps extends VariantProps<typeof toggleGroupVariants> {
  children: React.ReactNode;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  type: "single" | "multiple";
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, variant, value, onValueChange, type, children, ...props }, ref) => (
    <ToggleGroupContext.Provider value={{ value, onValueChange, type }}>
      <div
        ref={ref}
        className={cn(toggleGroupVariants({ variant, className }))}
        role="group"
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
);
ToggleGroup.displayName = "ToggleGroup";

const toggleGroupItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-8 px-2",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ToggleGroupItemProps extends VariantProps<typeof toggleGroupItemVariants> {
  children: React.ReactNode;
  className?: string;
  value: string;
  "aria-label"?: string;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, variant, size, value, children, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);
    const isPressed = context.value === value;
    
    const handleClick = () => {
      if (context.onValueChange && context.type === "single") {
        context.onValueChange(value);
      }
    };

    return (
      <button
        ref={ref}
        className={cn(toggleGroupItemVariants({ variant, size, className }))}
        data-state={isPressed ? "on" : "off"}
        aria-pressed={isPressed}
        onClick={handleClick}
        type="button"
        {...props}
      >
        {children}
      </button>
    );
  }
);
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };