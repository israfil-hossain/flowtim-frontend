import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileMutationFn, uploadUserAvatarMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUserProfileMutationFn,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: uploadUserAvatarMutationFn,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update profile picture",
        variant: "destructive",
      });
    },
  });
};