import ActiveUsersChart from "./ActiveUsersChart"
import SourceOfLeadsChart from "./LeadsChart"
import MapWithDemograhics from "./Map"
import PostsChart from "./PostsChart"
import TopTopicsChart from "./TopicChart"
import UserChart from "./UserChart"




const Dashboard = ({ isSidePanelOpen}:any) => {
  return (
    <div className={` ${!isSidePanelOpen ? "pl-48" : "pl-72"} duration-300 w-full flex flex-col   bg-[#F5F5F5]  gap-10   overflow-hidden pt-10`}>

    <div className="flex gap-16">
       <UserChart />
       <PostsChart />
      <ActiveUsersChart />
      </div>
      <div className="flex gap-16">

       <TopTopicsChart />
       <SourceOfLeadsChart />
      </div>
      <div className=" rounded-[10px]">

      <MapWithDemograhics />
      </div>
    
    </div>
    
  )
}

export default Dashboard

