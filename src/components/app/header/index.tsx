import GroupsMenu from "./groups-menu";
import UserInfo from "./user-info";

const Header = () => {
  return (
    <header className="flex flex-wrap items-center justify-between border-b p-4">
      <div className="contents flex-wrap items-center min-[450px]:flex min-[450px]:space-x-4">
        <h1 className="text-2xl font-semibold">B</h1>
        <GroupsMenu className="order-3 mt-5 w-full max-w-md min-[450px]:mt-0 min-[450px]:w-[200px]" />
      </div>
      <UserInfo />
    </header>
  );
};

export default Header;
