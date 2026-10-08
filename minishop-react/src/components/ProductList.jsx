import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart, onViewDetail }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 max-xs:grid-cols-1">
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
