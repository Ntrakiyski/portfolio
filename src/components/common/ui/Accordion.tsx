"use client"

import * as React from "react"
import { ChevronDownIcon, LucideIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Custom Accordion built from scratch.
 * Keeps the same API surface used in Projects.tsx:
 * - <Accordion type="single" collapsible>
 * - <AccordionItem value="...">
 * - <AccordionTrigger />
 * - <AccordionContent />
 */

type AccordionType = "single" | "multiple"

type AccordionContextType = {
  type: AccordionType
  collapsible?: boolean
  openValues: string[]
  toggle: (value: string) => void
}

const AccordionCtx = React.createContext<AccordionContextType | null>(null)

type AccordionProps = {
  type?: AccordionType
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (val: string | string[] | undefined) => void
  className?: string
  children?: React.ReactNode
}

function toArray(val?: string | string[]): string[] {
  if (val == null) return []
  return Array.isArray(val) ? val : [val]
}

function Accordion({
  type = "single",
  collapsible = false,
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  ...rest
}: AccordionProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState<string[]>(toArray(defaultValue))

  const openValues = isControlled ? toArray(value) : internal

  const setOpenValues = (next: string[]) => {
    if (isControlled) {
      onValueChange?.(type === "single" ? next[0] : next)
    } else {
      setInternal(next)
      onValueChange?.(type === "single" ? next[0] : next)
    }
  }

  const toggle = (val: string) => {
    if (type === "single") {
      const isOpen = openValues.includes(val)
      if (isOpen) {
        if (collapsible) setOpenValues([])
        // if not collapsible, keep it open
      } else {
        setOpenValues([val])
      }
    } else {
      const isOpen = openValues.includes(val)
      if (isOpen) {
        setOpenValues(openValues.filter(v => v !== val))
      } else {
        setOpenValues([...openValues, val])
      }
    }
  }

  return (
    <AccordionCtx.Provider value={{ type, collapsible, openValues, toggle }}>
      <div data-slot="accordion" className={cn("w-full", className)} {...rest}>
        {children}
      </div>
    </AccordionCtx.Provider>
  )
}

type AccordionItemProps = {
  value: string
  className?: string
  children?: React.ReactNode
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-value={value}
        className={cn(
          "border-b border-gray-200 overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: LucideIcon
  subtitle?: string
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, icon: Icon, subtitle, ...props }, ref) => {
    const ctx = React.useContext(AccordionCtx)
    const itemEl = React.useContext(ItemCtx)
    if (!ctx || !itemEl) return null
    const { openValues, toggle } = ctx
    const value = itemEl.value
    const isOpen = openValues.includes(value)

    return (
      <div className="flex">
        <button
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          aria-controls={`content-${value}`}
          onClick={() => toggle(value)}
          data-state={isOpen ? "open" : "closed"}
          className={cn(
            "flex flex-1 items-start justify-between gap-4 text-left transition-colors outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
            "px-6 py-4",
            "hover:bg-gray-50",
            isOpen ? "bg-white" : "",
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-3">
            {Icon && <Icon className="h-5 w-5 text-gray-600" aria-hidden="true" />}
            <div className="text-left">
              <h3 className="text-lg font-semibold text-primary-text">{children}</h3>
              {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
            </div>
          </div>
          <ChevronDownIcon
            className={cn(
              "text-gray-400 pointer-events-none size-4 shrink-0 transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
          />
        </button>
      </div>
    )
  }
)
AccordionTrigger.displayName = "AccordionTrigger"

type AccordionContentProps = {
  className?: string
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const ItemCtx = React.createContext<{ value: string } | null>(null)

const AccordionContentInner = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(AccordionCtx)
    const item = React.useContext(ItemCtx)
    if (!ctx || !item) return null

    const isOpen = ctx.openValues.includes(item.value)

    return (
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`content-${item.value}`}
            role="region"
            aria-hidden={!isOpen}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2, ease: "easeIn" },
            }}
            className="overflow-hidden text-sm"
          >
            <div ref={ref} className={cn("py-4", className)} {...props}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)
AccordionContentInner.displayName = "AccordionContent"

const AccordionContent = AccordionContentInner

// Wrap children of AccordionItem to provide value via context
const OriginalAccordionItem = AccordionItem
const WrappedAccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, ...rest }, ref) => {
    return (
      <ItemCtx.Provider value={{ value }}>
        <OriginalAccordionItem ref={ref} value={value} {...rest}>
          {children}
        </OriginalAccordionItem>
      </ItemCtx.Provider>
    )
  }
)
WrappedAccordionItem.displayName = "AccordionItem"

export {
  Accordion,
  WrappedAccordionItem as AccordionItem,
  AccordionTrigger,
  AccordionContent
}
