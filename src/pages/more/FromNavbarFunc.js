import {FaUserTie} from "react-icons/fa";
import {FcStatistics} from "react-icons/fc";
import {AiOutlineTransaction} from "react-icons/ai";

export const fromNavbarMobile = (text) => {
  if (text === "ROLE_BOG`CHA_MUDIRASI"){
      return [
          {
              name:"Asosiy",
              icon:"kicon kicon-home",
              path:"/sidebar/user/"
          },
          {
              name:"Menyular",
              icon:"kicon kicon-menu",
              path:"/sidebar/user/menu"
          },
          {
              name:"Bolalar soni",
              icon:"kicon kicon-kids",
              path:"/sidebar/user/childrenNumber"
          },
          {
              name:"Hisobotlar",
              icon:"kicon kicon-report",
              path:"/sidebar/user/report"
          },
          {
              name:"To'lovlar",
              icon:"kicon kicon-pay",
              path:"/sidebar/user/pays"
          },
      ]
  } else if (text === "ROLE_MANAGER"){
      return [
          {
              name:"Asosiy",
              icon:"kicon kicon-home",
              path:"/sidebar/user/"
          },
          {
              name:"Statistika",
              icon:"",
              icon2:<FcStatistics size={35} color={'#F08D34'}/>,
              path:"/sidebar/user/statistics"
          },
          {
              name:"To'lovlar",
              icon:"kicon kicon-pay",
              path:"/sidebar/user/pays-admin"
          },
      ]
  } else if(text === "ROLE_TECHNOLOGIST"){
      return [
          {
              name:"Asosiy",
              icon:"kicon kicon-home",
              path:"/sidebar/user/"
          },
          {
              name:"Statistika",
              icon:"",
              icon2:<FcStatistics size={35} color={'#F08D34'}/>,
              path:"/sidebar/user/statistics"
          },
          {
              name:"To'lovlar",
              icon:"kicon kicon-pay",
              path:"/sidebar/user/pays-admin"
          },
      ]
  } if(text === "ROLE_PROGRAMMER"){
        return [
            {
                name:"Asosiy",
                icon:"kicon kicon-home",
                path:"/sidebar/user/"
            },
            {
                name:"Marketolog",
                icon:"",
                icon2:<FaUserTie size={35} color={'#F08D34'}/>,
                path:"/sidebar/user/managers"
            },
            {
                name:"Statistika",
                icon:"",
                icon2:<FcStatistics size={35} color={'#F08D34'}/>,
                path:"/sidebar/user/statistics"
            },
            {
                name:"To'lovlar",
                icon:"kicon kicon-pay",
                path:"/sidebar/user/pays-admin"
            },
        ]
  }
}
