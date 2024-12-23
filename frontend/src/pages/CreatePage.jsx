import { Box, Button, Container, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            toast({
                title: "Validation Error",
                description: "Please fill in all fields.",
                status: "warning",
                isClosable: true,
            });
            return;
        }

        if (newProduct.price <= 0) {
            toast({
                title: "Validation Error",
                description: "Price must be greater than zero.",
                status: "warning",
                isClosable: true,
            });
            return;
        }

        const payload = {
            ...newProduct,
            price: Number(newProduct.price),
        };

        setIsLoading(true);

        try {
            const { success, message } = await createProduct(payload);
            if (!success) {
                toast({
                    title: "Error",
                    description: message,
                    status: "error",
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Success",
                    description: "Product created successfully!",
                    status: "success",
                    isClosable: true,
                });
                setNewProduct({ name: "", price: "", image: "" });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                status: "error",
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            aria-label="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder="Price"
                            aria-label="Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            min={0}
                        />
                        <Input
                            placeholder="Image URL"
                            aria-label="Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />

                        <Button
                            colorScheme="blue"
                            onClick={handleAddProduct}
                            w="full"
                            isDisabled={!newProduct.name || !newProduct.price || !newProduct.image}
                            isLoading={isLoading}
                        >
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;
