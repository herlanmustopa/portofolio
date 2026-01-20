import Link from "next/link";
import { albert_Sans } from "@/utils/font";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

// JSON-LD structured data for breadcrumbs
function generateBreadcrumbJsonLd(items: BreadcrumbItem[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  };
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const baseUrl = "https://herlanmustopa.com";

  return (
    <>
      {/* JSON-LD Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd(items, baseUrl)),
        }}
      />

      {/* Visual Breadcrumb */}
      <nav aria-label="Breadcrumb" className={`${albert_Sans.className}`}>
        <ol
          className="flex items-center space-x-2 text-sm text-black/60"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <span className="mx-2 text-black/40">/</span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-green transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              ) : (
                <span className="text-black font-medium" itemProp="name">
                  {item.name}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
