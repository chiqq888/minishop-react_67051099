import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart, onViewDetail }) {
  return (
    <div
      data-ui="product-grid"
      className="grid grid-cols-2 gap-3 min-[541px]:gap-5 min-[801px]:grid-cols-3 min-[1101px]:grid-cols-4 max-[360px]:grid-cols-1"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.title}
          price={product.price}
          image={product.image}
          category={product.category}
          rating={product.rating}
          onAddToCart={() => onAddToCart(product)}
          onViewDetail={() => onViewDetail(product)}
        />
      ))}
    </div>
  );
}
export default ProductList;
