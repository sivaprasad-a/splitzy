import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";

export interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  comingIn?: string;
}

export const navItems: NavItem[] = [
  { label: "Overview", href: "/", icon: <DashboardOutlinedIcon fontSize="small" /> },
  { label: "Circles", href: "/circles", icon: <GroupsOutlinedIcon fontSize="small" /> },
  { label: "Add expense", href: "/add-expense", icon: <AddCircleOutlinedIcon fontSize="small" /> },
  { label: "Personal", icon: <PersonOutlinedIcon fontSize="small" />, comingIn: "Phase 3" },
  { label: "Savings", icon: <SavingsOutlinedIcon fontSize="small" />, comingIn: "Phase 3" },
  { label: "Reports", icon: <DescriptionOutlinedIcon fontSize="small" />, comingIn: "Phase 4" },
  { label: "Settlements", href: "/settlements", icon: <SwapHorizOutlinedIcon fontSize="small" /> },
];

/** Subset shown in the mobile bottom nav — keep it to the primary actions. */
export const bottomNavItems: NavItem[] = navItems.filter((item) => !item.comingIn);
