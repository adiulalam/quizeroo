import { NavbarProvider } from "@/provider";
import { Navbar, Sidebar } from ".";
import { ScrollArea } from "../ui/ScrollArea";

export const NavbarContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NavbarProvider>
      <Navbar />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden bg-muted/40 pt-16">
          <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">{children}</div>
          </ScrollArea>
        </main>
      </div>
    </NavbarProvider>
  );
};
