import App from "@/App";
import AllProductPage from "@/components/pages/AllProductPage";
import ProductPage from "@/components/pages/ProductPage/ProductPage";
import type { RouteObject } from "react-router-dom";

const ErrorBoundary = () => <div>Произошла ошибка приложения</div>;

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <AllProductPage />,
      },
      {
        path: "product/:documentId",
        element: <ProductPage />,
      },
    ],
  },
];