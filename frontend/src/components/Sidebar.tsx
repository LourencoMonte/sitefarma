import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, Search } from 'lucide-react';
import { useAuthentication } from '@/hooks/useAuthentication';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logo } from './Logo';

export function AppSidebar() {
  const { isAuthenticated } = useAuthentication();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Início',
      url: '/',
      icon: Home,
    },
    {
      title: 'Consultar Medicamentos',
      url: '/',
      icon: Search,
    },
  ];

  const authMenuItems = [
    {
      title: 'Cadastrar Medicamento',
      url: '/cadastrar',
      icon: Plus,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <Link to="/">
          <Logo size="sm" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAuthenticated && (
          <SidebarGroup>
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {authMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <Link to={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t text-xs text-gray-500">
        © 2026 SiteFarma
      </SidebarFooter>
    </Sidebar>
  )
}