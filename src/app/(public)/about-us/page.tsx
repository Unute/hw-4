import type { Metadata } from "next";
import AboutUs from "@/shared/components/pages/AboutUs";

export const metadata: Metadata = {
  title: "О нас",
  description: "Узнайте больше о магазине Lalasia.",
};

const page = () => {
  return (
    <AboutUs />
  )
}

export default page