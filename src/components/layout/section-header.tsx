import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/typography/eyebrow";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

export interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowNumber?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowNumber,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-14 md:mb-16 flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow number={eyebrowNumber}>
          {eyebrow}
        </Eyebrow>
      )}

      <div className={cn("flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between")}>
        <div className="space-y-3 max-w-3xl">
          {typeof title === "string" ? (
            <Heading level={2} className="font-heading text-foreground tracking-tight">
              {title}
            </Heading>
          ) : (
            title
          )}

          {description && (
            typeof description === "string" ? (
              <Text variant="lead" className="font-body text-muted-foreground max-w-2xl">
                {description}
              </Text>
            ) : (
              description
            )
          )}
        </div>

        {action && (
          <div className="shrink-0 pt-2 sm:pt-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
