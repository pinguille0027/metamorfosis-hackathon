import { useState } from "react";

interface ProductEntry {
  title: string;
  href: string;
}

interface SearchBarProps {
  products: ProductEntry[];
}

export default function SearchBar({ products }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "100%",
        }}
      />

      {filtered.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            width:"100%",
            paddingInline:"0.5rem",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #ccc",
            borderTop: "none",
            zIndex: 1000,
            maxHeight: "50rem",
            overflowY: "auto",
            fontSize:"0.75rem"
          }}
        >
          {filtered.map((product, index) => (
            <a
              key={index}
              href={product.href}
              style={{
                display: "block",
                padding: "0.5rem",
                borderBottom: "1px solid #eee",
                textDecoration: "none",
                color: "black",
              }}
              onClick={() => setQuery("")}
            >
              {product.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}