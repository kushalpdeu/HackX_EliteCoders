import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart, Home, Plus, BookmarkIcon, User, LogOut, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const navigationItems = [
  { title: "Community Feed", url: createPageUrl("Feed"), icon: Home },
  { title: "Share Experience", url: createPageUrl("ShareExperience"), icon: Plus },
  { title: "My Experiences", url: createPageUrl("MyExperiences"), icon: Heart },
  { title: "Saved", url: createPageUrl("Saved"), icon: BookmarkIcon },
  { title: "Profile", url: createPageUrl("Profile"), icon: User },
];

export default function Layout({ children }) {
  const location = useLocation();
  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary: 206 100% 50%;
          --primary-foreground: 0 0% 100%;
          --secondary: 168 76% 42%;
          --accent: 38 92% 50%;
          --background: 210 40% 98%;
          --foreground: 215 25% 27%;
          --card: 0 0% 100%;
          --muted: 210 40% 96%;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-slate-50">
        <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-xl">
          <SidebarHeader className="border-b border-slate-200/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-800 tracking-tight">heal.io</h2>
                <p className="text-xs text-slate-500">Anonymous Community</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`rounded-xl transition-all duration-300 ${
                          location.pathname === item.url 
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25' 
                            : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-6 mx-3 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800 mb-1">Your Privacy Matters</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All posts are anonymous. Your identity remains completely private.
                  </p>
                </div>
              </div>
            </div>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200/60 p-4">
            {isLoading ? (
              <div className="flex items-center gap-3 p-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ) : user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                    style={{ backgroundColor: user.avatar_color || '#0EA5E9' }}
                  >
                    {(user.anonymous_username || user.full_name || 'A')[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-800 truncate">
                      {user.anonymous_username || 'Anonymous User'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">Safe & Private</p>
                  </div>
                </div>
                <button
                  onClick={() => base44.auth.logout()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : null}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 md:hidden sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors" />
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-cyan-500" />
                <h1 className="text-lg font-bold text-slate-800">heal.io</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}