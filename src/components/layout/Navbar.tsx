import React from "react";
export { Sidebar } from "./Sidebar";
export { TopHeader } from "./TopHeader";

// Legacy export compatibility if Navbar is called directly
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchBrand: (query: string) => void;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  onNewBrandDiagnosis: () => void;
}

export const Navbar: React.FC<Props> = (props) => {
  return (
    <div className="w-full">
      <TopHeader
        activeTab={props.activeTab}
        onSearchBrand={props.onSearchBrand}
        onNewBrandDiagnosis={props.onNewBrandDiagnosis}
        demoMode={props.demoMode}
        setDemoMode={props.setDemoMode}
        onOpenMobileSidebar={() => {}}
      />
    </div>
  );
};
