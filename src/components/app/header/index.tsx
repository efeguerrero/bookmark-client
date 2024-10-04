import GroupsMenu from "./groups-menu";
import UserInfo from "./user-info";
import * as Icon from "@/components/ui/icons";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-[--nav-height] w-full items-center justify-between gap-x-8 border-b bg-background p-4">
      <div className="flex items-center justify-start gap-x-2">
        <Icon.logo aria-label="Bookmarks logo" className="size-9 shrink-0" />
        <GroupsMenu className="w-[250px] shrink" />
      </div>
      <UserInfo />
    </header>
  );
};

export default Header;
