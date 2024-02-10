import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./mobile/MobileNavigation";
import MobileBranding from "./mobile/MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../config/authenticated";
import { Page } from "../../typings/ui/Page";

const pages: Page[] = [{ title: "Home", path: "/" }];

const Header = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  const headerPages = authenticated ? pages : [];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <MobileNavigation pages={headerPages} />
          <MobileBranding />
          <Navigation pages={headerPages} />
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
