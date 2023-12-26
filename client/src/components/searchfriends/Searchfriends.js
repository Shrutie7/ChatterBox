import React from "react";
import sf from "./Searchfriends.module.css";
const Searchfriends = ({ filteredrest }) => {
  return (
    <div className={sf.main}>
      {filteredrest.length > 0 ? (
        filteredrest?.map((ele) => {
          return <div className={sf.usercontainer}>{ele.username}</div>;
        })
      ) : (
        <div className={sf.usercontainer}>No users found</div>
      )}
    </div>
  );
};

export default Searchfriends;
