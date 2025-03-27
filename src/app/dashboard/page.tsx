import { Metadata } from "next";
import { Box } from "@mui/material";
import UserDashboard from "./user/dashboard";

export const generateMetadata = (): Metadata => {
  return {
    title: "Ukan 29 ::: Dashboard",
    description: "User Dashboard allows users manage their profile, orders, saved and settings",
  };
};

const Page = () => {
  return (
    <Box>
      <UserDashboard />
    </Box>
  )
}

export default Page