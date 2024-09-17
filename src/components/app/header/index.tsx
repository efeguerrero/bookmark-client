import GroupsMenu from "./groups-menu";
import UserInfo from "./user-info";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-semibold">B</h1>
        <GroupsMenu />
      </div>
      <UserInfo />
    </header>
  );
};

export default Header;
