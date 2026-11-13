import AppShell from "@/components/AppShell";
import AICoach from "@/components/AICoach";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppShell>{children}</AppShell>
      <AICoach />
    </>
  );
}
