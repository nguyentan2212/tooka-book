import React, { useState, useEffect } from "react";
import PageTitle from "../../../../template/layout/components/page-title/PageTitle";
import { Gavel } from "@material-ui/icons";
import { getAllRules } from "../js/rule";
import RulesForm from "../components/RulesForm";

function RulesPage() {
  const [rules, setRules] = useState(null);
  useEffect(() => {
    const fecthData = async () => {
      const data = await getAllRules();
      setRules(data);
    };
    fecthData();
  }, []);

  return (
    <div>
      <PageTitle
        title="Quy Định"
        subTitle="Quy Định"
        icon={() => <Gavel />}
      />
      {rules && <RulesForm rules={rules} />}
    </div>
  );
}

export default RulesPage;
