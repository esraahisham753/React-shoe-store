import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail(props) {
  const { id } = useParams();
  const { data: product, error, loading } = useFetch("products/" + id);
  const navigate = useNavigate();
  const skuRef = useRef();

  if (loading) {
    return <Spinner />;
  }

  if (!product) {
    return <PageNotFound />;
  }

  if (error) {
    throw error;
  }

  // TODO: Display these products details
  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" ref={skuRef}>
        <option value="">What Size ?</option>
        {product.skus.map((sku) => {
          return (
            <option value={sku.sku} key={sku.sku}>
              {sku.size}
            </option>
          );
        })}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            const sku = skuRef.current.value;
            if (!sku) return alert("Please, choose the size first");
            props.addToCart(id, sku);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
