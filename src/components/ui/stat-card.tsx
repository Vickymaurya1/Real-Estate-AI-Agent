"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  description?: string;
  icon?: LucideIcon;
  iconBg?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend = "up",
  description,
  icon: Icon,
  iconBg = "bg-accent/10 text-accent",
  className,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card
        className={cn(
          "bg-card border-border/80 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden",
          className
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
            {Icon && (
              <div className={cn("p-2.5 rounded-lg flex items-center justify-center", iconBg)}>
                <Icon className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="mt-2 flex items-baseline justify-between gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-foreground font-sans">
              {value}
            </h3>
            {change && (
              <Badge
                variant="secondary"
                className={cn(
                  "font-medium text-xs gap-1 px-2 py-0.5 rounded-full border-none",
                  trend === "up" && "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
                  trend === "down" && "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
                  trend === "neutral" && "bg-accent/15 text-accent"
                )}
              >
                {trend === "up" && <TrendingUp className="w-3 h-3" />}
                {trend === "down" && <TrendingDown className="w-3 h-3" />}
                {change}
              </Badge>
            )}
          </div>

          {description && (
            <p className="mt-2 text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
