import { useToast } from "@/components/ui/use-toast";
import { useMutation as useApolloMutation } from "@apollo/client";

interface UseMutationOptions {
    showToast?: boolean;
    onSuccess?: () => void;
}
export default function useMutation(
    MUTATION: any,
    { showToast = true, onSuccess }: UseMutationOptions = { showToast: true }
) {
    const { toast } = useToast();
    return useApolloMutation(MUTATION, {
        refetchQueries: ["SellerDashboard_PendingProductOffer"],
        onError: (error) => {
            if (showToast) {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
            }
        },
        onCompleted: (data) => {
            let value: any = Object.values(data)[0];
            let success = value.success;
            if (showToast) {
                toast({
                    title: success ? "Success" : "Error",
                    description: value.message,
                    variant: success ? "default" : "destructive",
                });
            }
            if (success) {
                onSuccess && onSuccess();
            }
        },
    });
}
