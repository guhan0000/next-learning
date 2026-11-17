type Product = { id: number; title: string; price: number };
export default async function Products() {
  let list: Product[]=[];
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Error in fetching products");
    }
    const result = await response.json();
    // console.log(result.products);
    const data: Product[] = result.products;
    list = data;
  } catch (error) {
    console.log(error);
  }

  return (
    <main>
      {list.map((prod: Product, index: number) => {
        return (
          <div key={index}>
            <h3>{prod.id}</h3>
            <h3>{prod.title}</h3>
            <h3>{prod.price}</h3>
          </div>
        );
      })}
    </main>
  );
}
