import { Container, SimpleGrid, Text, VStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "@/parts/ProductCard.jsx";

const HomePage = () => {
    const { fetchProducts, products } = useProductStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                await fetchProducts();
            } catch (err) {
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [fetchProducts]);

    if (loading) {
        return (
            <Container maxW='container.xl' py={12} textAlign="center">
                <Spinner size="xl" />
                <Text mt={4}>Loading products...</Text>
            </Container>
        );
    }

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    textAlign={"center"}
                >
                    Current Products 🚀
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3,
                    }}
                    spacing={10}
                    w={"full"}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>

                {products.length === 0 && (
                    <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                        No products found 😢{" "}
                        <Link to={"/create"}>
                            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                                Create a product
                            </Text>
                        </Link>
                    </Text>
                )}

                {error && (
                    <Text fontSize="xl" textAlign="center" color="red.500">
                        {error}
                    </Text>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;
