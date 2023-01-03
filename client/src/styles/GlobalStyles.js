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
    justify-content: space-around;
    box-shadow:none;
   }

   .Fgopz{
    border-radius:9999px;
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
    margin: 0.8em;
    width: 90px;
    height: 90px;
    border: 2px solid white;
    border-radius: 50%;
    background-color: white;
  }

  .kBbqaL{
    min-width: 250px;
  }

  .ais-Pagination-list{
    justify-content: center;
  }
  .dot-green {
  
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: green;
    cursor: pointer;
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
  .popup {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin-left: 0;
    background-color: rgba(0,0,0, 0.5);
  }
  .popup_inner {
    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    bottom: 25%;
    border-radius: 5px; 
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background: white;
  }
  .user-card {
    background-color:#edf2f7;
    padding: 1rem;
    float: none; 

    height: 100px;
    justify-content: space-around;
    margin-left:2em;
    margin-right:2em;
    border-radius: 5px;
   
    display: flex; 
    transition: all 0.25s ease;
    width: auto;
    flex-wrap: wrap;
    minWidth: 200px;
    height: 200 auto;
    border: none;
   
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
