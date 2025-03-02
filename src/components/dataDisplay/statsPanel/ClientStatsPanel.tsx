"use client";

import { useStats } from "@/app/providers/stats";
import StatsPanel from "./StatsPanel";

export default function ClientStatsPanel() {
  const { postCount } = useStats();
  return <StatsPanel postCount={postCount} />;
}
