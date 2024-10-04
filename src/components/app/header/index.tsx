import GroupsMenu from "./groups-menu";
import UserInfo from "./user-info";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-[--nav-height] w-full items-center justify-between border-b bg-background p-4">
      <div className="flex shrink items-center space-x-4">
        <h1 className="text-2xl font-semibold">B</h1>
        <GroupsMenu className="" />
      </div>
      <UserInfo />
    </header>
  );
};

export default Header;
