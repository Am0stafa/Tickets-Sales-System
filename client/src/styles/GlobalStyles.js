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
    box-shadow:none;
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

  .dot-yellow {
  
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #cca92c;
    cursor: pointer;
  }
  .dot-red {
    
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #c12222;
    cursor: pointer;
  }
  .dot-blue {
    
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #1b8ef3;
    cursor: pointer;
  }
  .dot-purple {
    
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #963f81;
    cursor: pointer;
  }
  
  .my-border{
      border: 5px solid;
      border-color: #219f45;
      vertical-align:bottom;
     
      border-radius: 50%;
     
      animation: pulse 1s infinite;
      display: inline-block;
  
    
  }
  @-webkit-keyframes pulse {
    0% {
      -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
    }
    70% {
        -webkit-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
    }
    100% {
        -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
    }
  }
  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
      box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
    }
    70% {
        -moz-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
        box-shadow: 0 0 0 10px rgba(204,169,44, 0);
    }
    100% {
        -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
        box-shadow: 0 0 0 0 rgba(204,169,44, 0);
    }
  }
  
.booked {
  background-color: #444444;
  width : 1000px;
  max-width: 1400px;
  margin: 4rem;
  border-color: #42b462;
  border: 6px solid;
}


  .ais-SearchBox{
    justify-content: center;
    align-items: center;
    width: auto;
  }
`
);

export default GlobalStyles;
