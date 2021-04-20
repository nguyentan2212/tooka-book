import React from "react";
import { QuickUserToggler } from "../extras/QuickUserToggler";

export function Topbar({user}) {
  return (
    <div className="topbar">
      <QuickUserToggler user={user} />
    </div>
  );
}
