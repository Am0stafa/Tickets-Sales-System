import SocialMedia from './socialMedia/SocialMedia';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";


  export default function AuthButton() {
    return (
      <Menu
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <Button variant="gradient">LogIn</Button>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <SocialMedia/>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }