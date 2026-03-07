import { Suspense } from "react";
import AllProductPage from "@/shared/components/pages/AllProductPage";

export default function PublicPage() {
  return (
    <Suspense>
      <AllProductPage />
    </Suspense>
  );
}
