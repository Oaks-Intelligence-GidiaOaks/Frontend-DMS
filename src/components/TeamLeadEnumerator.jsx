import React, { useState, useMemo, useEffect } from "react";
import { Enum, TeamLeadGrid } from "./grid";
import { useParams } from "react-router-dom";
import  axios  from "axios";

const TeamLeadEnumerator = () => {
  const { id } = useParams();
  const [teamLeadData, seTeamLeadData] = useState();

  console.log(teamLeadData);
  console.log(id);

  const memoizedEnumerators = useMemo(() => {
    return () =>
      axios
        .get(`/admin/team_lead_enumerators/${id}`)
        .then((res) => {
          // console.log(res.data);
          seTeamLeadData(res.data);
        })
        .catch((err) => console.log(err));
  }, []);

  useEffect(() => memoizedEnumerators, []);
  return (
    <div>
      hELLO WORLD
      {/* <TeamLeadGrid   /> */}
    </div>
  );
};

export default TeamLeadEnumerator;
