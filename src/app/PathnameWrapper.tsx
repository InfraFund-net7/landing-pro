import { headers } from "next/headers";
import Header from "@/component/header";
import HeaderHeroWrapper from "@/component/HeaderHeroWrapper";

export default async function PathnameWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-custom-pathname") || "/";
  console.log("Pathname:", pathname);

  return (
    <>
      {pathname === "/" ? (
        <HeaderHeroWrapper>{children}</HeaderHeroWrapper>
      ) : (
        <>
          <Header />
          {children}
        </>
      )}
    </>
  );
}