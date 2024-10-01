import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import MopedRoundedIcon from "@mui/icons-material/MopedRounded";
import DiningRoundedIcon from "@mui/icons-material/DiningRounded";
import FlatwareRoundedIcon from "@mui/icons-material/FlatwareRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { logout } from "@/actions";
import { useSession } from "next-auth/react";

interface SideBarProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  role?: "admin" | "user" | "server" | "kitchen" | "delivery";
}
type Role = "admin" | "user" | "server" | "kitchen" | "delivery";
// Configuración del menú para cada rol
const menuConfig: Record<
  Role,
  {
    name: string;
    link?: string;
    onClick?: () => void;
    icon: React.JSX.Element;
  }[]
> = {
  admin: [
    { name: "Perfil", link: "/profile", icon: <PeopleIcon /> },
    { name: "Productos", link: "/products", icon: <MenuBookRoundedIcon /> },
    {
      name: "Órdenes",
      link: "/orders",
      icon: <AutoAwesomeMotionRoundedIcon />,
    },
    { name: "Cocina", link: "/kitchen", icon: <DiningRoundedIcon /> },
    { name: "Personal", link: "/server", icon: <FlatwareRoundedIcon /> },
    { name: "Domicilio", link: "/delivery", icon: <MopedRoundedIcon /> },
    { name: "Extras", link: "/extras", icon: <ControlPointRoundedIcon /> },
    { name: "Dashboard", link: "/dashboard", icon: <DashboardIcon /> },
  ],
  user: [
    { name: "Perfil", link: "/profile", icon: <PeopleIcon /> },
    {
      name: "Órdenes",
      link: "/orders",
      icon: <AutoAwesomeMotionRoundedIcon />,
    },
    {
      name: "Carro de compras",
      link: "/cart",
      icon: <LocalGroceryStoreRoundedIcon />,
    },
    { name: "Favoritos", link: "/favorites", icon: <FavoriteRoundedIcon /> },
  ],
  server: [
    { name: "Perfil", link: "/profile", icon: <PeopleIcon /> },
    { name: "Personal", link: "/server", icon: <FlatwareRoundedIcon /> },
    {
      name: "Órdenes",
      link: "/orders",
      icon: <AutoAwesomeMotionRoundedIcon />,
    },
  ],
  kitchen: [
    { name: "Cocina", link: "/kitchen", icon: <DiningRoundedIcon /> },
    {
      name: "Órdenes",
      link: "/orders",
      icon: <AutoAwesomeMotionRoundedIcon />,
    },
  ],
  delivery: [
    { name: "Domicilio", link: "/delivery", icon: <MopedRoundedIcon /> },
    {
      name: "Órdenes",
      link: "/orders",
      icon: <AutoAwesomeMotionRoundedIcon />,
    },
    { name: "Salir", onClick: () => logout(), icon: <ExitToAppIcon /> }, // Aquí va la función de logout
  ],
};

export const SideBar: React.FC<SideBarProps> = ({ open, toggleDrawer }) => {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  // Definir el rol, asegurándonos de que sea uno de los valores válidos
  const role: Role = (session?.user.role as Role) || "user";

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        {/* Mostrar siempre "Favoritos" y "Carro de compras" */}
        
        {!isAuthenticated ? (
          // Si no está autenticado, solo muestra la opción de ingresar
          
          <ListItemButton href="/auth/login">
            <ListItemIcon>
              <LoginRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Ingresar" />
          </ListItemButton>
        ) : (
          // Si está autenticado, mostrar las opciones basadas en el rol
          <>
            {menuConfig[role].map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={item.link ? "a" : "button"} // Actúa como enlace si hay un link
                  href={item.link ? item.link : undefined} // Solo agregar href si hay un link
                  onClick={item.onClick ? item.onClick : undefined} // Manejar onClick si existe
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <ListItemButton onClick={() => logout()}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} anchor="right" onClose={() => toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};
