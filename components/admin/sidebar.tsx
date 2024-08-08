import {
  Box,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from '@chakra-ui/react';
import {
  Sidebar,
  SidebarSection,
  NavItem,
  SidebarToggleButton,
  SidebarOverlay,
  PersonaAvatar,
} from '@saas-ui/react';
import { FiHome, FiUsers, FiSettings, FiBox } from 'react-icons/fi';

const SidebarComponent = () => {
  return (
    <Sidebar toggleBreakpoint="xl" height="100vh">
      <SidebarToggleButton />
      <SidebarSection direction="row" p="4">
        <Image
          src="/static/images/Logo Serba Premium.png"
          boxSize="7"
          alt="Serba Premium"
        />
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            icon={
              <PersonaAvatar
                presence="online"
                size="xs"
                src="/static/images/avatar3.jpg"
              />
            }
            variant="ghost"
          />
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection aria-label="Main" display="flex" flexDirection="column" flex="1">
        <NavItem icon={<FiHome />} href="/admin/dashboard" isActive>
          Home
        </NavItem>
        <NavItem icon={<FiUsers />} href="#" >Users</NavItem>
        <NavItem icon={<FiBox />} href="/admin/pricing" >Item</NavItem>
        <NavItem icon={<FiSettings />}>Settings</NavItem>
      </SidebarSection>
      <SidebarOverlay />
    </Sidebar>
  );
};

export default SidebarComponent;
