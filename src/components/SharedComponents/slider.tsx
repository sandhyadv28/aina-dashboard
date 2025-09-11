import React, { useState, useRef, useCallback } from "react"

interface SliderProps {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  max?: number
  min?: number
  step?: number
  className?: string
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ 
    value, 
    defaultValue = [0], 
    onValueChange, 
    max = 100, 
    min = 0, 
    step = 1, 
    className = "",
    disabled = false,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = useState(value || defaultValue)
    const [isDragging, setIsDragging] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLDivElement>(null)

    const currentValue = value !== undefined ? value : internalValue
    const percentage = ((currentValue[0] - min) / (max - min)) * 100

    const updateValue = useCallback((newValue: number) => {
      const clampedValue = Math.max(min, Math.min(max, newValue))
      const steppedValue = Math.round(clampedValue / step) * step
      
      if (value === undefined) {
        setInternalValue([steppedValue])
      }
      onValueChange?.([steppedValue])
    }, [min, max, step, value, onValueChange])

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      if (disabled) return
      
      e.preventDefault()
      setIsDragging(true)
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!sliderRef.current) return
        
        const rect = sliderRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = Math.max(0, Math.min(1, x / rect.width))
        const newValue = min + percentage * (max - min)
        updateValue(newValue)
      }
      
      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      // Handle initial click
      handleMouseMove(e.nativeEvent)
    }, [disabled, min, max, updateValue])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (disabled) return
      
      const stepSize = step || 1
      let newValue = currentValue[0]
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault()
          newValue = Math.max(min, currentValue[0] - stepSize)
          break
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault()
          newValue = Math.min(max, currentValue[0] + stepSize)
          break
        case 'Home':
          e.preventDefault()
          newValue = min
          break
        case 'End':
          e.preventDefault()
          newValue = max
          break
        default:
          return
      }
      
      updateValue(newValue)
    }, [disabled, currentValue, min, max, step, updateValue])

    return (
      <div
        ref={ref || sliderRef}
        className={`relative flex w-full touch-none select-none items-center ${className}`}
        {...props}
      >
        <div
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          <div
            className="absolute h-full bg-primary transition-all duration-150"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          ref={thumbRef}
          className={`absolute h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer'
          } ${isDragging ? 'scale-110' : 'hover:scale-105'}`}
          style={{ left: `calc(${percentage}% - 10px)` }}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue[0]}
          aria-disabled={disabled}
        />
      </div>
    )
  }
)

export { Slider }