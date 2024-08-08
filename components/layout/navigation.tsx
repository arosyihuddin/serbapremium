import * as React from "react";
import { HStack, Button, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import siteConfig from "data/config";
import { NavLink } from "components/nav-link";
import { useScrollSpy } from "hooks/use-scrollspy";
import { MobileNavButton } from "components/mobile-nav";
import { MobileNavContent } from "components/mobile-nav";
import { useDisclosure, useUpdateEffect } from "@chakra-ui/react";
import ThemeToggle from "./theme-toggle";
import Cookies from "js-cookie";

const Navigation: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const mobileNav = useDisclosure();
  const router = useRouter();
  const activeId = useScrollSpy(
    siteConfig.header.links
      .filter(({ id }) => id)
      .map(({ id }) => `[id="${id}"]`),
    {
      threshold: 0.75,
    }
  );

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);

  // Update auth status from cookie
  React.useEffect(() => {
    const token = Cookies.get('serbapremiumId');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      Cookies.remove('serbapremiumId'); // Hapus token dari cookie
      setIsAuthenticated(false); // Perbarui status autentikasi
      router.push('/'); // Arahkan ke halaman beranda setelah logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <HStack spacing="2" flexShrink={0}>
      {siteConfig.header.links.map(({ href, id, label, requiresAuth, ...props }, i) => {
        if (requiresAuth === undefined || requiresAuth === isAuthenticated) {
          if (label === 'Logout' && !isMobile) { // Tambahkan kondisi untuk mode mobile
            return (
              <Button
                key={i}
                onClick={handleLogout}
                variant="primary"
              >
                Logout
              </Button>
            );
          }
          return (
            <NavLink
              key={i}
              display={["none", null, "block"]}
              href={href || `/#${id}`}
              isActive={
                !!(
                  (id && activeId === id) ||
                  (href && !!router.asPath.match(new RegExp(href)))
                )
              }
              {...props}
            >
              {label}
            </NavLink>
          );
        }
      })}

      <ThemeToggle />

      <MobileNavButton
        ref={mobileNavBtnRef}
        aria-label="Open Menu"
        onClick={mobileNav.onOpen}
      />

      <MobileNavContent 
        isOpen={mobileNav.isOpen} 
        onClose={mobileNav.onClose} 
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
    </HStack>
  );
};

export default Navigation;
