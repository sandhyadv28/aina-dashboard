import * as React from "react"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className="w-full bg-gray-700 rounded-full h-1.5"
        {...props}
      >
        <div
          className="bg-blue-600 h-1.5 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }
)

export { Progress }