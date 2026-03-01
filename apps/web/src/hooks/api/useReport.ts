import { useQuery } from "@tanstack/react-query";
import { ReportService } from "@/services/api/ReportService";

// export const useGetGeneratedAccountStatement = (params: {
//   accountId: string;
//   type: "duration" | "fy"|"custom";
//   value: string;
//   customRange: { startDate: string; endDate: string };
// }) => {
//   return useQuery({
//     queryKey: [
//       "generatedAccountStatement",
//       params.accountId,
//       params.type,
//       params.value,
//       params.customRange,
//     ],
//     queryFn: () => ReportService.getGeneratedAccountStatement(params),
//     enabled:false
//   });
// };



import { useMutation } from "@tanstack/react-query";

export const useGenerateAccountStatement = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ReportService.getGeneratedAccountStatement,
  });

  return {
    generate: mutate,
    isLoading: isPending,
  };
};
