import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Brand button — sharp-edged, tall editorial. Only the variants the site uses:
 *   • default — filled brown CTA            (e.g. "Få 50 kr. til første klip")
 *   • hvid    — filled white, brown text    (over dark imagery, e.g. sign-up banner)
 *   • outline — white outline on transparent (over the hero photo, "Book tid")
 *
 * One size (`xl`). To style a link as a button, render a `Link` through the
 * `render` prop (`<Button nativeButton={false} render={<Link … />}>`), or apply
 * `buttonVariants(...)` directly.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center border whitespace-nowrap font-medium transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brown text-white hover:bg-brown/90",
        hvid: "border-transparent bg-white text-brown hover:bg-white/90",
        outline:
          "border-white bg-transparent text-white hover:bg-white hover:text-brown",
      },
      size: {
        xl: "h-12 gap-2 px-6 text-body",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xl",
    },
  }
)

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
