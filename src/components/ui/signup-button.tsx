"use client";

import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

// The Klaviyo onsite form opened by every sign-up CTA (club / newsletter).
// Kept in one place so all sign-up buttons stay in sync.
const KLAVIYO_SIGNUP_FORM_ID = "THmhhK";

declare global {
  interface Window {
    _klOnsite?: unknown[];
  }
}

type SignupButtonProps = ComponentProps<typeof Button> & {
  /** Klaviyo onsite form id to open. Defaults to the club sign-up form. */
  formId?: string;
};

/**
 * Brand Button that opens the Klaviyo onsite sign-up form on click. Drop-in
 * replacement for <Button> at any newsletter / club sign-up CTA — keeps the
 * form id in exactly one place. Any passed `onClick` still runs first.
 */
export function SignupButton({
  formId = KLAVIYO_SIGNUP_FORM_ID,
  onClick,
  ...props
}: SignupButtonProps) {
  return (
    <Button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        const queue = (window._klOnsite = window._klOnsite || []);
        queue.push(["openForm", formId]);
      }}
      {...props}
    />
  );
}
