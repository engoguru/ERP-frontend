import React from "react";

export function StatCard({ title, value, icon: Icon, trend, className }) {
  return (
    <div
      className={
        `bg-card rounded-xl p-6 border border-gray-300 shadow-card card-elevated ${className || ""}`
      }
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-display text-foreground">{value}</p>

          {trend && (
            <p
              className={
                `text-sm font-medium flex items-center gap-1 `
              }
            >

              <span className={`${trend.isPositive ? "text-[hsl(168_76%_42%)]" : "text-destructive"}`}>{trend.isPositive ? "↑" : "↓"}{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground font-normal"> vs last month</span>
            </p>
          )}
        </div>
        {title === "Urgent Tasks"
          ?
          <div className="p-3 rounded-lg bg-red-200 text-red-700 animate-pulse">
            {Icon && <Icon className="w-6 h-6 scale-110" />}
          </div>

          :
          <div className="p-3 rounded-lg text-[hsl(168_76%_42%)]">

            {Icon && <Icon className="w-6 h-6 text-" />}
          </div>}

      </div>
    </div>
  );
}
