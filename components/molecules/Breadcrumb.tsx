"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { albert_Sans } from "@/app/fonts";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

// JSON-LD structured data for breadcrumbs
function generateBreadcrumbJsonLd(items: BreadcrumbItem[], baseUrl: string, currentPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      const itemUrl = item.href
        ? `${baseUrl}${item.href}`
        : isLast
          ? `${baseUrl}${currentPath}`
          : undefined;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        ...(itemUrl && { item: itemUrl }),
      };
    }),
  };
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const baseUrl = "https://www.herlanmustopa.com";
  const pathname = usePathname();

  return (
    <>
      {/* JSON-LD Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd(items, baseUrl, pathname)),
        }}
      />

      {/* Visual Breadcrumb */}
      <nav aria-label="Breadcrumb" className={`${albert_Sans.className}`}>
        <ol
          className="flex items-center space-x-2 text-sm text-black/60 dark:text-dark-text-muted"
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
                <span className="mx-2 text-black/40 dark:text-dark-text-muted">/</span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-green dark:hover:text-green-light transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              ) : (
                <span className="text-black dark:text-dark-text font-medium" itemProp="name">
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

