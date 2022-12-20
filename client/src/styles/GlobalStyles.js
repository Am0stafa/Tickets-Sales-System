import { createGlobalStyle } from "styled-components";
import { globalStyles } from "twin.macro";

const GlobalStyles = createGlobalStyle(
  globalStyles,
  `
   /* Below animations are for modal created using React-Modal */
     .ReactModal__Overlay {
     transition: transform 300ms ease-in-out;
     transition-delay: 100ms;
     transform: scale(0);
   }
   .ReactModal__Overlay--after-open{
     transform: scale(1);
   }
   .ReactModal__Overlay--before-close{
     transform: scale(0);
   }
   .ais-Hits-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

   }
   .TwoColumnWithVideo__Container-sc-sn3u7g-0 yisDD{
    margin-top: -500px;
   }

   .ais-Hits-item{  
    list-style: none;
    flex: 0 0 15%;
    box-shadow: none;
    justify-content: center;

  }

  .avatar {
    display: flex;
    margin: 1em;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: white;
  }

  .kBbqaL{
    min-width: 250px;
  }
  .ais-Pagination-list{
    justify-content: center;
  }
  .ais-SearchBox{
    justify-content: center;
    align-items: center;
    width: auto;
  }
`
);

export default GlobalStyles;
