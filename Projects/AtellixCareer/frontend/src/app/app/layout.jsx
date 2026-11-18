import AppShell from "@/components/AppShell";
import AICoach from "@/components/AICoach";
export default function AppLayout({ children }) {
    return (<>
      <AppShell>{children}</AppShell>
      <AICoach />
    </>);
}
