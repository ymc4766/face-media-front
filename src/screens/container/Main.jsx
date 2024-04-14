import SearchSection from "../SearchSection";
import SidebarSec from "../SidebarSec";
import WidgetSection from "../WidgetSection";

const Main = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Section */}
      <div className="md:w-1/5 bg-gray-200 p-4 sm:mr-4">
        <SidebarSec />
      </div>

      {/* Main Content Section */}
      <div className="md:w-3/5 p-4 md:flex items-center px-3">
        {/* Search Section */}
        <div className="mb-4  flex-grow mr-7 bg-slate-200 py-2">
          <SearchSection />
        </div>

        {/* Widget Section */}
        <div className=" mb-4 mmd:w-[30%] bg-slate-200 py-2">
          <WidgetSection />
        </div>
      </div>
    </div>
  );
};

export default Main;
