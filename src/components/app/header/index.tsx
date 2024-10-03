import GroupsMenu from "./groups-menu";
import UserInfo from "./user-info";

const Header = () => {
  return (
    <header className="flex flex-wrap items-center justify-between border-b p-4">
      <div className="xs:flex xs:space-x-4 contents flex-wrap items-center">
        <h1 className="text-2xl font-semibold">B</h1>
        <GroupsMenu className="xs:mt-0 xs:w-[200px] order-3 mt-5 w-full max-w-md" />
      </div>
      <UserInfo />
    </header>
  );
};

export default Header;
