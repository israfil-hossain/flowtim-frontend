import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResizablePanelGroupProps {
  direction: "horizontal" | "vertical";
  className?: string;
  children: ReactNode;
}

interface ResizablePanelProps {
  defaultSize: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
  children: ReactNode;
}

interface ResizableHandleProps {
  className?: string;
}

export const ResizablePanelGroup: FC<ResizablePanelGroupProps> = ({
  direction,
  className,
  children,
}) => {
  return (
    <div 
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
    >
      {children}
    </div>
  );
};

export const ResizablePanel: FC<ResizablePanelProps> = ({
  defaultSize,
  minSize,
  maxSize,
  className,
  children,
}) => {
  const style = {
    flexBasis: `${defaultSize}%`,
    minWidth: minSize ? `${minSize}%` : undefined,
    maxWidth: maxSize ? `${maxSize}%` : undefined,
  };

  return (
    <div 
      className={cn("flex-shrink-0", className)}
      style={style}
    >
      {children}
    </div>
  );
};

export const ResizableHandle: FC<ResizableHandleProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        "w-1 bg-border hover:bg-accent cursor-col-resize flex-shrink-0",
        className
      )}
    />
  );
};