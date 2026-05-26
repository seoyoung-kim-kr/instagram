import NavBar from "@/components/NavBar";
import SWRConfigContext from "@/provider/SWRConfigContext";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <SWRConfigContext>
        <main className="flex flex-col w-full items-center">{children}</main>
      </SWRConfigContext>
    </>
  );
}
