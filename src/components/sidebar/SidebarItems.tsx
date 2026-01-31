import React from "react";
import MenuItems from "./MenuItems";
import { usePathname } from "next/navigation";
import { List, Box } from "@mui/material";
import NavItem from "./NavItems";
import NavGroup from "./NavGroup";

interface SidebarItemsProps {
  onItemClick?: () => void;
}

const SidebarItems = ({ onItemClick }: SidebarItemsProps) => {
  const pathname = usePathname();

  return (
    <Box>
      <List component="nav" sx={{ p: 0 }}>
        {MenuItems.map((item) => {
          if (item.navlabel) {
            return <NavGroup item={item} key={item.subheader} />;
          } else if (item.id && item.href && item.title) {
            return (
              <NavItem
                item={{ href: item.href, title: item.title, icon: item.icon }}
                key={item.id}
                pathDirect={pathname}
                onClick={onItemClick}
              />
            );
          }
          return null;
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
