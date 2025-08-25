// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// interface LoginForm {
//   email: string;
//   password: string;
// }

// export function useLoginForm(formData: LoginForm) {
//   return useQuery({
//     queryKey: ["login", formData],
//     queryFn: async () => {
//       const response = await axios.post(
//         "http://localhost:7777/login",
//         formData,
//         { withCredentials: true }
//       );
//       return response.data;
//     },
//     enabled: false, // 👈 prevent auto-run
//   });
// }
