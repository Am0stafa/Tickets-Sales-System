import React from 'react'
import { useLocation } from 'react-router-dom';
import tw from "twin.macro";
import HeaderBase, {
  NavLinks,
  NavLink,
  PrimaryLink,
} from "../components/headers/light.js";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import CheckoutComponent from '../components/checkout/index';
import ProgressBar from "@ramonak/react-progress-bar";
import Countdown from 'react-countdown';
const Header = tw(HeaderBase)`max-w-none`;


const Checkout = () => {

    const { state } = useLocation();
    const buttonRoundedCss = tw`rounded-full`;
    const [progress, setProgress] = React.useState(60);
    const Completionist = () => {
        //TODO: redirect 
        return <span>Session ended</span>;

    }
    const navLinks = [
      <NavLinks key={1}>
        <NavLink href="/#">About</NavLink>
        <NavLink href="/#">Blog</NavLink>
        <NavLink href="/#">Pricing</NavLink>
        <NavLink href="/#">Contact Us</NavLink>
        <NavLink href="/#">Testimonials</NavLink>
      </NavLinks>,
      <NavLinks key={2}>
        <NavLink href="/#" tw="lg:ml-12!">
          Login
        </NavLink>
        <PrimaryLink css={buttonRoundedCss} href="/#">
          Sign Up
        </PrimaryLink>
      </NavLinks>,
    ];
    return (
      <AnimationRevealPage>
        <Header links={navLinks} />
        <ProgressBar completed={progress} />
        <Countdown date={Date.now() + 10000}>
            <Completionist />
        </Countdown>
        <CheckoutComponent total={state.total} setProgress={setProgress} />
      </AnimationRevealPage>
    );
    }
    
    export default Checkout
