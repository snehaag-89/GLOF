import Navbar from "../components/Navbar";
import AlertComponent from "../components/Alerts";
import MapBox from "../components/MapBox";
function Home(){
return (
     <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />
         
      {/* Dashboard Grid */}
     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {/* Alerts */}
      <AlertComponent />

      {/* Analytics */}
    

      {/* Map */}
      <MapBox />
     </div>
    </div>
)
}
export default Home;