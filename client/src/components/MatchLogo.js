import React from 'react'
import { Avatar } from "@material-tailwind/react";

const MatchLogo = ({user,setProgress,progress,choices,setChoices}) => {
    const handleClick = (e) => {
        if (progress < 25) {
            setProgress((prev) => prev+25 )
        }        

        if(e.target.src.includes(user.homeTeam)){
            setChoices({...choices,team:user.homeTeam,side:"home"})
        }else{
            setChoices({...choices,team:user.awayTeam,side:"away"})
        }
        console.log(choices)
    }
  return (
    <div>
        <Avatar src={`/assets/${user.homeTeam}.png`} alt="avatar" size="xxl" onClick={handleClick}>
        </Avatar>
        <Avatar src={`/assets/${user.awayTeam}.png`} alt="avatar" size="xxl" onClick={handleClick}/>

        {/* <img src={`/assets/stadium-right.svg`} alt="st" /> */}

    </div>
  )
}

export default MatchLogo