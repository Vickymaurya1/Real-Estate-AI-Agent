import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, Construction, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PlaceholderPageProps {
  title: string;
  description: string;
  category: "Operations" | "Tools" | "Client Portal" | "System";
  icon?: LucideIcon;
}

export function PlaceholderPage({
  title,
  description,
  category,
  icon: Icon = Construction,
}: PlaceholderPageProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <Card className="bg-card border-border/80 shadow-xs rounded-xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/60 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-0.5">
                  {description}
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-accent/15 text-accent border-none text-xs font-bold uppercase">
              {category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Construction className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg font-bold text-foreground">
              {title} Module Placeholder
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This route is configured as part of the EstateCall platform shell. Full functionality, interactive workflows, and backend API integration will be wired up in the next development phase.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Link href="/dashboard">
              <Button size="sm" variant="outline" className="text-xs font-semibold gap-1.5">
                <span>Back to Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
