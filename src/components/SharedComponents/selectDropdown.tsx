import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Check } from "lucide-react"

type Option = {
  value: string
  label: string
}

interface SelectDropdownProps {
  values: Option[]
  value?: string
  onChange?: (val: string) => void
  placeholder?: string
  className?: string
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  values,
  value,
  onChange,
  placeholder = "Select an option",
  className,
}) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selected = values.find((opt) => opt.value === value)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className={`relative w-48 ${className || ''}`}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <p className={`truncate ${!selected ? 'text-muted-foreground' : ''}`}>
          {selected ? selected.label : placeholder}
        </p>
        {open ? (
          <ChevronUp className="h-4 w-4 opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-auto rounded-md border border-input bg-background text-foreground shadow-lg">
          {values.map((item) => {
            const isSelected = value === item.value
            return (
              <div
                key={item.value}
                onClick={() => {
                  onChange?.(item.value)
                  setOpen(false)
                }}
                className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-accent-foreground hover:bg-accent`}
              >
                {isSelected && (
                  <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
                    <Check className="h-4 w-4" />
                  </span>
                )}
                <p>{item.label}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SelectDropdown