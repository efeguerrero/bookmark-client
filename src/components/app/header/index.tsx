import GroupsMenu from "./groups-menu";
import UserInfo from "./user-info";

const Header = () => {
  return (
    <header className="fixed top-0 z-10 flex h-[--nav-height] w-full flex-wrap items-center justify-between border-b bg-background p-4">
      <div className="contents flex-wrap items-center xs:flex xs:space-x-4">
        <h1 className="text-2xl font-semibold">B</h1>
        <GroupsMenu className="order-3 mt-5 w-full max-w-md xs:mt-0 xs:w-[250px]" />
      </div>
      <UserInfo />
    </header>
  );
};

export default Header;
