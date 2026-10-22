import { SiteShell } from "@/components/site-shell";

export default function MakietyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell>{children}</SiteShell>;
}
