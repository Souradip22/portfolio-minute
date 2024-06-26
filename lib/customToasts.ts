import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

export function successToast(params: any) {
  toast({
    title: params.title ? params.title : "Action Success!",
    variant: "success",
    description: params.description ? params.description : "",
    // action: <ToastAction altText="Try again">Try again</ToastAction>,
  });
}

export function errorToast(params: any) {
  toast({
    title: params.title ? params.title : "Error Occurred!",
    variant: "failure",
    description: params.description
      ? params.description
      : "Server is not able to handle this request, pls try again later",
    // action: <ToastAction altText="Try again">Try again</ToastAction>,
  });
}
