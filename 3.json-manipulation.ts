import productsData from "./sources/products.json";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    onSale: boolean;
    totalCount: number;
    gender: string;
    color: string;
}

// Helper function to group an array of objects by a key
const groupBy = <T, K extends keyof any>(
    array: T[],
    key: (item: T) => K
): Record<K, T[]> => {
    return array.reduce((result, currentItem) => {
        const groupKey = key(currentItem);
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(currentItem);
        return result;
    }, {} as Record<K, T[]>);
};

// 1. Which products are out of stock, `not` on sale, and under $20?
const outOfStockNotOnSaleUnder20Products = (products: Product[]): Product[] => {
    return products.filter(
        (product) =>
            product.onSale === false &&
            product.totalCount === 0 &&
            product.price <= 20
    );
};
console.log("1:", outOfStockNotOnSaleUnder20Products(productsData));

// 2. What is the most commonly used category?
const mostCommonlyUsedCategory = (products: Product[]) => {
    // could be done with reduce to decrease the time complexity,
    // but for this small dataset, this is more readable

    const productsByCategory = groupBy(products, (product) => product.category);
    const mostCommonCategory = Object.keys(productsByCategory).reduce(
        (acc, category) => {
            return productsByCategory[category].length >
                productsByCategory[acc].length
                ? category
                : acc;
        },
        ""
    );

    return mostCommonCategory;
};
console.log("2:", mostCommonlyUsedCategory(productsData));

// 3. What is the average price of sale items?
const averagePriceOfSaleProducts = (products: Product[]): number => {
    // could be done with reduce to decrease the time complexity,
    // but for this small dataset, this is more readable

    const saleProducts: Product[] = products.filter((product) => product.onSale);
    const sumOfSaleProducts: number = saleProducts.reduce(
        (acc: number, product: Product) => acc + product.price,
        0
    );

    return sumOfSaleProducts / saleProducts.length;
};
console.log("3:", averagePriceOfSaleProducts(productsData));

// 4. How many women’s products are out of stock, broken down by color?
const womenProductsOutOfStockByColor = (
    products: Product[]
): Record<string, Product[]> => {
    // could be done with reduce to decrease the time complexity,
    // but for this small dataset, this is more readable

    const womenProducts: Product[] = products.filter(
        (product) => product.gender === "women"
    );
    const productsByColor: Record<string, Product[]> = groupBy(womenProducts, (product) => product.color);

    return productsByColor;
};
console.log("4:", womenProductsOutOfStockByColor(productsData));
