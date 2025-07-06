import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import CRMSidebar from "./components/CRMSidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Import view components
import HomeView from "./views/HomeView"
import SettingsView from "./views/SettingsView"
import UserView from "./views/UserView"
import ProductView from "./views/ProductView"

// Component mapping
const componentMap: Record<string, React.ComponentType> = {
  dashboard: HomeView,
  user: UserView,
  product: ProductView,
  settings: SettingsView,
}

const AdminCRM = () => {
    const [selectedItem, setSelectedItem] = useState("dashboard")
    
    const SelectedComponent = componentMap[selectedItem] || HomeView
    
  return (
    <SidebarProvider>
        <CRMSidebar 
          selectedItem={selectedItem}
          onItemSelect={setSelectedItem}
        />
        <SidebarInset>
          <header className="flex items-center border-b px-4 py-2">
            <SidebarTrigger className="cursor-pointer" />
          </header>
          <main className="flex-1 overflow-auto">
            <SelectedComponent />
          </main>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminCRM