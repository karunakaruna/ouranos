import type { Metadata } from "next";
import SidePanel from "@/components/navigational/sidePanel/SidePanel";
import Aside from "@/components/navigational/aside/Aside";
import AppBar from "@/components/navigational/appBar/AppBar";
import TopBar from "@/components/navigational/topBar/TopBar";
import Composer from "@/components/actions/composer/Composer";
import { getProfile } from "@/lib/api/bsky/actor";
import { getSessionFromServer } from "@/lib/api/auth/session";
import { AgentProvider } from "../providers/agent";
import { SidebarProvider } from "../providers/sidebar";
import { StatsProvider } from "../providers/stats";
import MainContent from "@/components/layout/MainContent";
import ClientStatsPanel from "@/components/dataDisplay/statsPanel/ClientStatsPanel";

export const metadata: Metadata = {
  title: { template: "%s — Ouranos", default: "Ouranos" },
  description: "Home",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.bskySession.handle);

  return (
    <AgentProvider session={session}>
      <SidebarProvider>
        <StatsProvider>
          <div className="flex flex-col h-screen">
            <div className="flex flex-1 overflow-hidden">
              <SidePanel />
              <MainContent>
                {profile && <Composer author={profile} />}
                <section className="w-full md:max-w-xl">
                  {profile && <TopBar profile={profile} />}
                  {children}
                </section>
                {profile && <Aside avatar={profile?.avatar} handle={profile?.handle} />}
                <AppBar />
              </MainContent>
            </div>
            <ClientStatsPanel />
          </div>
        </StatsProvider>
      </SidebarProvider>
    </AgentProvider>
  );
}
