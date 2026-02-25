//больше не нужен т.к. заменяется ProductListStore




// import { useEffect, useState } from "react";

// import { getAllProducts } from "@/api/getAllProducts";
// import type { Product } from "@/types/product";

// export const useGetAllProduct = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [total, setTotal] = useState<number | undefined>(undefined);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getAllProducts()
//       .then((data) => {
//         setProducts(data.data);
//         setTotal(data.meta.pagination.total);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return { products, total, loading };
// };