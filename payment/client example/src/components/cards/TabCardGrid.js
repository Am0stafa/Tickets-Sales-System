import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "../misc/Layouts.js";
import { SectionHeading } from "../misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { useNavigate } from "react-router-dom";
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;

const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 mr-1`}
  }
`;
const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;
const SecondaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

function continent(code) {
  //see https://gist.github.com/nobuti/3816985
  switch (code) {
    case "AF":
      return "Asia";
    case // "Islamic Republic of Afghanistan")
    "AX":
      return "Europe";
    case // "Åland Islands")
    "AL":
      return "Europe";
    case // "Republic of Albania")
    "DZ":
      return "Africa";
    case // "People's Democratic Republic of Algeria")
    "AS":
      return "Oceania";
    case // "American Samoa")
    "AD":
      return "Europe";
    case // "Principality of Andorra")
    "AO":
      return "Africa";
    case // "Republic of Angola")
    "AI":
      return "North America";
    case // "Anguilla")
    "AQ":
      return "Antarctica";
    case // "Antarctica (the territory South of 60 deg S)")
    "AG":
      return "North America";
    case // "Antigua and Barbuda")
    "AR":
      return "South America";
    case // "Argentine Republic")
    "AM":
      return "Asia";
    case // "Republic of Armenia")
    "AW":
      return "North America";
    case // "Aruba")
    "AU":
      return "Oceania";
    case // "Commonwealth of Australia")
    "AT":
      return "Europe";
    case // "Republic of Austria")
    "AZ":
      return "Asia";
    case // "Republic of Azerbaijan")
    "BS":
      return "North America";
    case // "Commonwealth of the Bahamas")
    "BH":
      return "Asia";
    case // "Kingdom of Bahrain")
    "BD":
      return "Asia";
    case // "People's Republic of Bangladesh")
    "BB":
      return "North America";
    case // "Barbados")
    "BY":
      return "Europe";
    case // "Republic of Belarus")
    "BE":
      return "Europe";
    case // "Kingdom of Belgium")
    "BZ":
      return "North America";
    case // "Belize")
    "BJ":
      return "Africa";
    case // "Republic of Benin")
    "BM":
      return "North America";
    case // "Bermuda")
    "BT":
      return "Asia";
    case // "Kingdom of Bhutan")
    "BO":
      return "South America";
    case // "Plurinational State of Bolivia")
    "BQ":
      return "North America";
    case // '535'
    "BA":
      return "Europe";
    case // "Bosnia and Herzegovina")
    "BW":
      return "Africa";
    case // "Republic of Botswana")
    "BV":
      return "Antarctica";
    case // "Bouvet Island (Bouvetoya)")
    "BR":
      return "South America";
    case // "Federative Republic of Brazil")
    "IO":
      return "Asia";
    case // "British Indian Ocean Territory (Chagos Archipelago)")
    "VG":
      return "North America";
    case // "British Virgin Islands")
    "BN":
      return "Asia";
    case // "Brunei Darussalam")
    "BG":
      return "Europe";
    case // "Republic of Bulgaria")
    "BF":
      return "Africa";
    case // "Burkina Faso")
    "BI":
      return "Africa";
    case // "Republic of Burundi")
    "KH":
      return "Asia";
    case // "Kingdom of Cambodia")
    "CM":
      return "Africa";
    case // "Republic of Cameroon")
    "CA":
      return "North America";
    case // "Canada")
    "CV":
      return "Africa";
    case // "Republic of Cape Verde")
    "KY":
      return "North America";
    case // "Cayman Islands")
    "CF":
      return "Africa";
    case // "Central African Republic")
    "TD":
      return "Africa";
    case // "Republic of Chad")
    "CL":
      return "South America";
    case // "Republic of Chile")
    "CN":
      return "Asia";
    case // "People's Republic of China")
    "CX":
      return "Asia";
    case // "Christmas Island")
    "CC":
      return "Asia";
    case // "Cocos (Keeling) Islands")
    "CO":
      return "South America";
    case // "Republic of Colombia")
    "KM":
      return "Africa";
    case // "Union of the Comoros")
    "CD":
      return "Africa";
    case // "Democratic Republic of the Congo")
    "CG":
      return "Africa";
    case // "Republic of the Congo")
    "CK":
      return "Oceania";
    case // "Cook Islands")
    "CR":
      return "North America";
    case // "Republic of Costa Rica")
    "CI":
      return "Africa";
    case // "Republic of Cote d'Ivoire")
    "HR":
      return "Europe";
    case // "Republic of Croatia")
    "CU":
      return "North America";
    case // "Republic of Cuba")
    "CW":
      return "North America";
    case // "Curaçao")
    "CY":
      return "Asia";
    case // "Republic of Cyprus")
    "CZ":
      return "Europe";
    case // "Czech Republic")
    "DK":
      return "Europe";
    case // "Kingdom of Denmark")
    "DJ":
      return "Africa";
    case // "Republic of Djibouti")
    "DM":
      return "North America";
    case // "Commonwealth of Dominica")
    "DO":
      return "North America";
    case // "Dominican Republic")
    "EC":
      return "South America";
    case // "Republic of Ecuador")
    "EG":
      return "Africa";
    case // "Arab Republic of Egypt")
    "SV":
      return "North America";
    case // "Republic of El Salvador")
    "GQ":
      return "Africa";
    case // "Republic of Equatorial Guinea")
    "ER":
      return "Africa";
    case // "State of Eritrea")
    "EE":
      return "Europe";
    case // "Republic of Estonia")
    "ET":
      return "Africa";
    case // "Federal Democratic Republic of Ethiopia")
    "FO":
      return "Europe";
    case // "Faroe Islands")
    "FK":
      return "South America";
    case // "Falkland Islands (Malvinas)")
    "FJ":
      return "Oceania";
    case // "Republic of Fiji")
    "FI":
      return "Europe";
    case // "Republic of Finland")
    "FR":
      return "Europe";
    case // "French Republic")
    "GF":
      return "South America";
    case // "French Guiana")
    "PF":
      return "Oceania";
    case // "French Polynesia")
    "TF":
      return "Antarctica";
    case // "French Southern Territories")
    "GA":
      return "Africa";
    case // "Gabonese Republic")
    "GM":
      return "Africa";
    case // "Republic of the Gambia")
    "GE":
      return "Asia";
    case // "Georgia")
    "DE":
      return "Europe";
    case // "Federal Republic of Germany")
    "GH":
      return "Africa";
    case // "Republic of Ghana")
    "GI":
      return "Europe";
    case // "Gibraltar")
    "GR":
      return "Europe";
    case // "Hellenic Republic Greece")
    "GL":
      return "North America";
    case // "Greenland")
    "GD":
      return "North America";
    case // "Grenada")
    "GP":
      return "North America";
    case // "Guadeloupe")
    "GU":
      return "Oceania";
    case // "Guam")
    "GT":
      return "North America";
    case // "Republic of Guatemala")
    "GG":
      return "Europe";
    case // "Bailiwick of Guernsey")
    "GN":
      return "Africa";
    case // "Republic of Guinea")
    "GW":
      return "Africa";
    case // "Republic of Guinea-Bissau")
    "GY":
      return "South America";
    case // "Co-operative Republic of Guyana")
    "HT":
      return "North America";
    case // "Republic of Haiti")
    "HM":
      return "Antarctica";
    case // "Heard Island and McDonald Islands")
    "VA":
      return "Europe";
    case // "Holy See (Vatican City State)")
    "HN":
      return "North America";
    case // "Republic of Honduras")
    "HK":
      return "Asia";
    case // "Hong Kong Special Administrative Region of China")
    "HU":
      return "Europe";
    case // "Hungary")
    "IS":
      return "Europe";
    case // "Republic of Iceland")
    "IN":
      return "Asia";
    case // "Republic of India")
    "ID":
      return "Asia";
    case // "Republic of Indonesia")
    "IR":
      return "Asia";
    case // "Islamic Republic of Iran")
    "IQ":
      return "Asia";
    case // "Republic of Iraq")
    "IE":
      return "Europe";
    case // "Ireland")
    "IM":
      return "Europe";
    case // "Isle of Man")
    "IL":
      return "Asia";
    case // "State of Israel")
    "IT":
      return "Europe";
    case // "Italian Republic")
    "JM":
      return "North America";
    case // "Jamaica")
    "JP":
      return "Asia";
    case // "Japan")
    "JE":
      return "Europe";
    case // "Bailiwick of Jersey")
    "JO":
      return "Asia";
    case // "Hashemite Kingdom of Jordan")
    "KZ":
      return "Asia";
    case // "Republic of Kazakhstan")
    "KE":
      return "Africa";
    case // "Republic of Kenya")
    "KI":
      return "Oceania";
    case // "Republic of Kiribati")
    "KP":
      return "Asia";
    case // "Democratic People's Republic of Korea")
    "KR":
      return "Asia";
    case // "Republic of Korea")
    "KW":
      return "Asia";
    case // "State of Kuwait")
    "KG":
      return "Asia";
    case // "Kyrgyz Republic")
    "LA":
      return "Asia";
    case // "Lao People's Democratic Republic")
    "LV":
      return "Europe";
    case // "Republic of Latvia")
    "LB":
      return "Asia";
    case // "Lebanese Republic")
    "LS":
      return "Africa";
    case // "Kingdom of Lesotho")
    "LR":
      return "Africa";
    case // "Republic of Liberia")
    "LY":
      return "Africa";
    case // "Libya")
    "LI":
      return "Europe";
    case // "Principality of Liechtenstein")
    "LT":
      return "Europe";
    case // "Republic of Lithuania")
    "LU":
      return "Europe";
    case // "Grand Duchy of Luxembourg")
    "MO":
      return "Asia";
    case // "Macao Special Administrative Region of China")
    "MK":
      return "Europe";
    case // "Republic of Macedonia")
    "MG":
      return "Africa";
    case // "Republic of Madagascar")
    "MW":
      return "Africa";
    case // "Republic of Malawi")
    "MY":
      return "Asia";
    case // "Malaysia")
    "MV":
      return "Asia";
    case // "Republic of Maldives")
    "ML":
      return "Africa";
    case // "Republic of Mali")
    "MT":
      return "Europe";
    case // "Republic of Malta")
    "MH":
      return "Oceania";
    case // "Republic of the Marshall Islands")
    "MQ":
      return "North America";
    case // "Martinique")
    "MR":
      return "Africa";
    case // "Islamic Republic of Mauritania")
    "MU":
      return "Africa";
    case // "Republic of Mauritius")
    "YT":
      return "Africa";
    case // "Mayotte")
    "MX":
      return "North America";
    case // "United Mexican States")
    "FM":
      return "Oceania";
    case // "Federated States of Micronesia")
    "MD":
      return "Europe";
    case // "Republic of Moldova")
    "MC":
      return "Europe";
    case // "Principality of Monaco")
    "MN":
      return "Asia";
    case // "Mongolia")
    "ME":
      return "Europe";
    case // "Montenegro")
    "MS":
      return "North America";
    case // "Montserrat")
    "MA":
      return "Africa";
    case // "Kingdom of Morocco")
    "MZ":
      return "Africa";
    case // "Republic of Mozambique")
    "MM":
      return "Asia";
    case // "Republic of the Union of Myanmar")
    "NA":
      return "Africa";
    case // "Republic of Namibia")
    "NR":
      return "Oceania";
    case // "Republic of Nauru")
    "NP":
      return "Asia";
    case // "Federal Democratic Republic of Nepal")
    "NL":
      return "Europe";
    case // "Kingdom of the Netherlands")
    "NC":
      return "Oceania";
    case // "New Caledonia")
    "NZ":
      return "Oceania";
    case // "New Zealand")
    "NI":
      return "North America";
    case // "Republic of Nicaragua")
    "NE":
      return "Africa";
    case // "Republic of Niger")
    "NG":
      return "Africa";
    case // "Federal Republic of Nigeria")
    "NU":
      return "Oceania";
    case // "Niue")
    "NF":
      return "Oceania";
    case // "Norfolk Island")
    "MP":
      return "Oceania";
    case // "Commonwealth of the Northern Mariana Islands")
    "NO":
      return "Europe";
    case // "Kingdom of Norway")
    "OM":
      return "Asia";
    case // "Sultanate of Oman")
    "PK":
      return "Asia";
    case // "Islamic Republic of Pakistan")
    "PW":
      return "Oceania";
    case // "Republic of Palau")
    "PS":
      return "Asia";
    case // "Occupied Palestinian Territory")
    "PA":
      return "North America";
    case // "Republic of Panama")
    "PG":
      return "Oceania";
    case // "Independent State of Papua New Guinea")
    "PY":
      return "South America";
    case // "Republic of Paraguay")
    "PE":
      return "South America";
    case // "Republic of Peru")
    "PH":
      return "Asia";
    case // "Republic of the Philippines")
    "PN":
      return "Oceania";
    case // "Pitcairn Islands")
    "PL":
      return "Europe";
    case // "Republic of Poland")
    "PT":
      return "Europe";
    case // "Portuguese Republic")
    "PR":
      return "North America";
    case // "Commonwealth of Puerto Rico")
    "QA":
      return "Asia";
    case // "State of Qatar")
    "RE":
      return "Africa";
    case // "Réunion")
    "RO":
      return "Europe";
    case // "Romania")
    "RU":
      return "Europe";
    case // "Russian Federation")
    "RW":
      return "Africa";
    case // "Republic of Rwanda")
    "BL":
      return "North America";
    case // "Saint Barthélemy")
    "SH":
      return "Africa";
    case // '654'
    "KN":
      return "North America";
    case // "Federation of Saint Kitts and Nevis")
    "LC":
      return "North America";
    case // "Saint Lucia")
    "MF":
      return "North America";
    case // "Saint Martin (French part)")
    "PM":
      return "North America";
    case // "Saint Pierre and Miquelon")
    "VC":
      return "North America";
    case // "Saint Vincent and the Grenadines")
    "WS":
      return "Oceania";
    case // "Independent State of Samoa")
    "SM":
      return "Europe";
    case // "Republic of San Marino")
    "ST":
      return "Africa";
    case // "Democratic Republic of Sao Tome and Principe")
    "SA":
      return "Asia";
    case // "Kingdom of Saudi Arabia")
    "SN":
      return "Africa";
    case // "Republic of Senegal")
    "RS":
      return "Europe";
    case // "Republic of Serbia")
    "SC":
      return "Africa";
    case // "Republic of Seychelles")
    "SL":
      return "Africa";
    case // "Republic of Sierra Leone")
    "SG":
      return "Asia";
    case // "Republic of Singapore")
    "SX":
      return "North America";
    case // "Sint Maarten (Dutch part)")
    "SK":
      return "Europe";
    case // "Slovakia (Slovak Republic)")
    "SI":
      return "Europe";
    case // "Republic of Slovenia")
    "SB":
      return "Oceania";
    case // "Solomon Islands")
    "SO":
      return "Africa";
    case // "Somali Republic")
    "ZA":
      return "Africa";
    case // "Republic of South Africa")
    "GS":
      return "Antarctica";
    case // "South Georgia and the South Sandwich Islands")
    "SS":
      return "Africa";
    case // "Republic of South Sudan")
    "ES":
      return "Europe";
    case // "Kingdom of Spain")
    "LK":
      return "Asia";
    case // "Democratic Socialist Republic of Sri Lanka")
    "SD":
      return "Africa";
    case // "Republic of Sudan")
    "SR":
      return "South America";
    case // "Republic of Suriname")
    "SJ":
      return "Europe";
    case // "Svalbard & Jan Mayen Islands")
    "SZ":
      return "Africa";
    case // "Kingdom of Swaziland")
    "SE":
      return "Europe";
    case // "Kingdom of Sweden")
    "CH":
      return "Europe";
    case // "Swiss Confederation")
    "SY":
      return "Asia";
    case // "Syrian Arab Republic")
    "TW":
      return "Asia";
    case // "Taiwan
    "TJ":
      return "Asia";
    case // "Republic of Tajikistan")
    "TZ":
      return "Africa";
    case // "United Republic of Tanzania")
    "TH":
      return "Asia";
    case // "Kingdom of Thailand")
    "TL":
      return "Asia";
    case // "Democratic Republic of Timor-Leste")
    "TG":
      return "Africa";
    case // "Togolese Republic")
    "TK":
      return "Oceania";
    case // "Tokelau")
    "TO":
      return "Oceania";
    case // "Kingdom of Tonga")
    "TT":
      return "North America";
    case // "Republic of Trinidad and Tobago")
    "TN":
      return "Africa";
    case // "Tunisian Republic")
    "TR":
      return "Asia";
    case // "Republic of Turkey")
    "TM":
      return "Asia";
    case // "Turkmenistan")
    "TC":
      return "North America";
    case // "Turks and Caicos Islands")
    "TV":
      return "Oceania";
    case // "Tuvalu")
    "UG":
      return "Africa";
    case // "Republic of Uganda")
    "UA":
      return "Europe";
    case // "Ukraine")
    "AE":
      return "Asia";
    case // "United Arab Emirates")
    "GB":
      return "Europe";
    case // "United Kingdom of Great Britain & Northern Ireland")
    "US":
      return "North America";
    case // "United States of America")
    "UM":
      return "Oceania";
    case // "United States Minor Outlying Islands")
    "VI":
      return "North America";
    case // "United States Virgin Islands")
    "UY":
      return "South America";
    case // "Eastern Republic of Uruguay")
    "UZ":
      return "Asia";
    case // "Republic of Uzbekistan")
    "VU":
      return "Oceania";
    case // "Republic of Vanuatu")
    "VE":
      return "South America";
    case // "Bolivarian Republic of Venezuela")
    "VN":
      return "Asia";
    case // "Socialist Republic of Vietnam")
    "WF":
      return "Oceania";
    case // "Wallis and Futuna")
    "EH":
      return "Africa";
    case // "Western Sahara")
    "YE":
      return "Asia";
    case // "Yemen")
    "ZM":
      return "Africa"; // "Republic of Zambia")
    case "ZW":
      return "Africa"; // "Republic of Zimbabwe");
    default:
      return "UNKNOWN";
  }
}

export default ({ user, countryCode, avail }) => {
  const navigate = useNavigate();
  const result = avail.data[user.id - 1];
  // if (user.homeTeam === "Brazil") result.status = "Temporarily Unavailable";
  // if (user.homeTeam === "Brazil") result.status = "Sold Out";
  if (user.location === "TBA") result.status = "Temporarily Unavailable";

  return (
    <Card
      style={{
        borderTopLeftRadius: "0.25rem",
        borderTopRightRadius: "0.25rem",
        boxShadow: "none",
      }}
      className="group"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <CardImageContainer
        imageSrc="/assets/bg-grey.jpg"
        style={{
          maxHeight: "200px",
          minWidth: "300px",
          borderTopLeftRadius: "0.25rem",
          // display: "flex",
          position: "relative",
          justifyContent: "center",
          borderTopRightRadius: "0.25rem",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {user.homeRank !== null && (
          <div
            style={{
              objectPosition: "left top",
              marginLeft: "-8.4px",
            }}
          >
            <img
              style={{
                position: "absolute",
                marginTop: "-8.4px",
                width: "100px",
                height: "100px",
              }}
              src="/assets/ribbon.png"
              width="50"
              alt="fire"
            />
            <CardTitle
              style={{
                transform: "rotate(-46deg)",
                position: "absolute",
                marginTop: "18px",
                color: "black",
              }}
            >
              Popular
            </CardTitle>
          </div>
        )}

        {user.homeRank === null && (
          <>
            <div style={{ height: "34px" }} />

            {user.location === "TBA" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img className="avatar" src={`/assets/tba.png`} alt="TBA" />

                <img className="avatar" src={`/assets/tba.png`} alt="TBA" />
              </div>
            )}

            {user.location !== "TBA" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  className="avatar"
                  src={`/assets/${user.homeTeam}.png`}
                  alt="Home"
                />

                <img
                  className="avatar"
                  src={`/assets/${user.awayTeam}.png`}
                  alt="Away"
                />
              </div>
            )}
          </>
        )}

        {user.homeRank !== null && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{ marginTop: "50px" }}
              className="avatar"
              src={`/assets/${user.homeTeam}.png`}
              alt="/assets/tba.png"
            />

            <img
              style={{ marginTop: "50px" }}
              className="avatar"
              src={`/assets/${user.awayTeam}.png`}
              alt="/assets/tba.png"
            />
          </div>
        )}

        {(continent(countryCode) === user.homeTeamContinents ||
          continent(countryCode) === user.awayTeamContinents) && (
          <CardRatingContainer>
            <CardRating>
              <LocationIcon />
              Near Me
            </CardRating>
          </CardRatingContainer>
        )}
        <CardHoverOverlay
          variants={{
            hover: {
              opacity: 1,
              height: "auto",
            },
            rest: {
              opacity: 0,
              height: 0,
            },
          }}
          transition={{ duration: 0.3 }}
        >
          {(user.location === "TBA" ||
            result.status === "Sold Out" ||
            result.status === "Temporarily Unavailable") && (
            <SecondaryButton
              style={{
                backgroundColor: "#c6c6c6",
              }}
              disabled={true}
            >
              Buy Now
            </SecondaryButton>
          )}
          {user.location !== "TBA" && result.status === "Available" && (
            <CardButton
              onClick={() =>
                navigate(`/book/${user.id}`, { state: { ...user } })
              }
            >
              Buy Now
            </CardButton>
          )}
        </CardHoverOverlay>
      </CardImageContainer>
      <div style={{ display: "grid", gridTemplateColumns: "4fr 1fr" }}>
        <CardText style={{ minWidth: "255px" }}>
          {(user.location === "TBA" ||
            result.status === "Sold Out" ||
            result.status === "Temporarily Unavailable") && (
            <CardTitle style={{ cursor: "pointer" }}>
              {user.homeTeam} vs {user.awayTeam}
            </CardTitle>
          )}
          {user.location !== "TBA" && result.status === "Available" && (
            <CardTitle
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/book/${user.id}`, { state: { ...user } })
              }
            >
              {" "}
              {user.homeTeam} vs {user.awayTeam}
            </CardTitle>
          )}
          <div style={{ margin: "0.8em" }}></div>
          <CardContent style={{ display: "flex" }}>
            <img
              alt=""
              src="/assets/calendar.svg"
              style={{ height: "20px", width: "20px" }}
            />
            <div style={{ margin: "0.2em" }}></div>

            {user.Date}
          </CardContent>
          <CardContent style={{ display: "flex" }}>
            <img
              alt=""
              src="/assets/stadium.svg"
              style={{ height: "20px", width: "20px" }}
            />
            <div style={{ margin: "0.2em" }}></div>
            {user.location}
            {/* <img
            alt=""
            src="/assets/soldout.png"
            style={{ alignSelf: "right", height: "80px", width: "120px" }}
          /> */}
            {/* <div style={{ width: "10px" }}></div> */}
          </CardContent>
        </CardText>
        {result.status === "Available" && (
          <CardText
            style={{
              marginLeft: "-20px",
              minWidth: "95px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div className="dot-green"></div>
              <div style={{ height: "5px" }}></div>
              <CardContent>Available</CardContent>
              {result.numOfAvailable < 800 && (
                <h1 style={{ color: "red" }}>{result.numOfAvailable} Left!</h1>
              )}
            </div>
          </CardText>
        )}
        {result.status === "Temporarily Unavailable" && (
          <CardText
            style={{
              marginLeft: "-25px",
              minWidth: "95px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="dot-yellow"></div>
              <div style={{ height: "5px" }}></div>
              <CardContent>Temporarily Unavailable</CardContent>
            </div>
          </CardText>
        )}
        {result.status === "Sold Out" && (
          <CardText
            style={{
              marginLeft: "-20px",
              minWidth: "95px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="dot-red"></div>
              <div style={{ height: "5px" }}></div>
              <CardContent>Sold Out</CardContent>
            </div>
          </CardText>
        )}
      </div>
    </Card>
  );
};
