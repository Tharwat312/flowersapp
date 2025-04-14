import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
    return useQuery({
        queryKey: ['getPoducts'],
        queryFn: async () => {
            try {
                const response = await fetch(`/api/products/get`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const payload = await response.json();
                console.log(payload, "Hello from custom hook");
                return payload;
            } catch (error) {
                console.log(error);
            }
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10
    })
}