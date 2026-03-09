import type { Metadata } from "next";
import Register from "@/shared/components/pages/Register";

export const metadata: Metadata = {
  title: "Вход / Регистрация",
  description: "Войдите или создайте аккаунт в Lalasia.",
};

const page = () => {
  return (
    <Register />
  )
}

export default page