import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../hooks/useProducts.ts";

export const ProductItem = ({ product }: { product: Product }) => {
  return (
    <>
      <figure className="px-4 pt-4 h-64 bg-white dark:bg-gray-700">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </figure>
      <div className="card-body">
        <div className="badge badge-secondary mb-2">{product.category}</div>
        <h3 className="card-title text-base line-clamp-2">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
            <span className="text-sm">{product.rating.rate.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-500">
            ({product.rating.count} reviews)
          </span>
        </div>
        <div className="card-actions justify-between items-center mt-4">
          <div className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </div>
          <div>
            {(product as typeof product & { inStock: boolean }).inStock ? (
              <span className="badge badge-success">In Stock</span>
            ) : (
              <span className="badge badge-error">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
