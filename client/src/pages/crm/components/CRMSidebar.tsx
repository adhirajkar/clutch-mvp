import {
  User,
  Settings,
  Package,
  LayoutDashboard,
  MoreHorizontal,
  ShieldUser,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
// Menu items.
const items = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "user",
    title: "User",
    icon: User,
  },
  {
    id: "product",
    title: "Product",
    icon: Package,
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
  },
];

interface CRMSidebarProps {
  selectedItem: string;
  onItemSelect: (itemId: string) => void;
}

function CRMSidebar({ selectedItem, onItemSelect }: CRMSidebarProps) {
    const {user, setUser} = useAuthStore();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg mb-4">
            ClutchMVP 📦
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    className="cursor-pointer"
                    onClick={() => onItemSelect(item.id)}
                    isActive={selectedItem === item.id}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between px-2 py-3 border-t">
          <div className="flex items-center space-x-3 flex-1">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="@shadcn" />
              <AvatarFallback><ShieldUser /></AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{user?.name ? user.name : 'Admin'}</p>
              <p className="text-[10px] text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="font-medium">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLogout()}>
                Logout <LogOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default CRMSidebar;
