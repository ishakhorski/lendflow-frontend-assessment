import productsData from "./sources/products.json";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    onSale: boolean;
    inStock: boolean;
    gender: string;
    color: string;
}

// 1. Which products are out of stock, `not` on sale, and under $20?
const outOfStockNotOnSaleUnder20Products = (products: Product[]): Product[] => {
    return products.filter(
        (product) =>
            product.inStock === false &&
            product.onSale === false &&
            product.price <= 20
    );
};
console.log("1:", outOfStockNotOnSaleUnder20Products(productsData));

// 2. What is the most commonly used category?
const mostCommonlyUsedCategory = (products: Product[]): string => {
    const categoriesUsageMap = products.reduce(
        (acc: Record<string, number>, product: Product) => {
            if (acc[product.category]) {
                acc[product.category]++;
            } else {
                acc[product.category] = 1;
            }

            return acc;
        },
        {}
    );

    return Object.keys(categoriesUsageMap).reduce((a, b) =>
        categoriesUsageMap[a] > categoriesUsageMap[b] ? a : b
    );
};
console.log("2:", mostCommonlyUsedCategory(productsData));

// 3. What is the average price of sale items?
const averagePriceOfSaleProducts = (products: Product[]): number => {
    const { sum, count } = products.reduce(
        (acc: { sum: number; count: number }, product: Product) => {
            if (product.onSale) {
                acc.sum += product.price;
                acc.count++;
            }

            return acc;
        },
        { sum: 0, count: 0 }
    );

    return sum / count;
};
console.log("3:", averagePriceOfSaleProducts(productsData));

// 4. How many women’s products are out of stock, broken down by color?
const womenProductsOutOfStockByColor = (
    products: Product[]
): Record<string, Product[]> => {
    return products.reduce((acc: Record<string, Product[]>, product: Product) => {
        if (product.inStock) {
            return acc;
        }

        if (acc[product.color]) {
            acc[product.color].push(product);
        } else {
            acc[product.color] = [product];
        }

        return acc;
    }, {});
};
console.log("4:", womenProductsOutOfStockByColor(productsData));
