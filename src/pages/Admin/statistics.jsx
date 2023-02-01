import React, {useEffect} from "react";
import { Roles } from "../../helpers/user-types";

import useUser from "../../hooks/useAuth";
import StatisticLecturer from "./stat-let";
import StatisticAdmin from "./stats-adm";
import StatisticBook from "./stats-bok";
import StatisticCat from "./stats-cat";
import StatisticUser from "./stats-user";

const Statistic = () =>{
  const user = useUser(state => state.user);


  if(user.userType ===Roles.lecturer){
    return <StatisticLecturer />
  }
  if(user.userType ===Roles.user){
    return <StatisticUser />
  }
  if(user.userType ===Roles.bookmod){
    return <StatisticBook />
  }
  if(user.userType ===Roles.catmod){
    return <StatisticCat />
  }

  if(user.userType ===Roles.admin){
    return <StatisticAdmin />
  }

  return(
    <>
      <p>No content available now</p>
    </>
  )

}

export default Statistic