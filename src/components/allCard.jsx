import React from "react";
import CardDetails from "./cardDetails";
const data2=[
  "Incomplete","To-Do"
]

const ClientProjectList = () => {
  const [clientData, setClientData] = React.useState([]);

  // <-- Fetching Data -->
  React.useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setClientData(data));
  }, []);
  return (
    <>
      <div className="flex gap-3 overflow-auto py-10">
       {data2?.length? data2?.map((clientData22,index)=>
      {       
         return( <div className="w-[350px] flex-shrink-0 whitespace-normal h-[400px] overflow-y-scroll bg-gray-100 px-2 rounded-md">
          <div className="space-y-3">
            <div className="flex justify-between items-center sticky top-0 bg-gray-100 py-2">
              <div className="flex items-center gap-1">
                <div className=" w-6 h-6 flex justify-center items-center rounded-l-full bg-rose-600"></div>
                <h2>{clientData22}</h2>
              </div>
              <div className=" w-6 h-6 flex justify-center items-center rounded-lg bg-gray-300">
                <h1>0</h1>
              </div>
            </div>
            {/* <-- Details --> */}
            {clientData.map((data, index) => {
              let data2 = { ...data, id: data.id + 19787656 };
              return <CardDetails data={data2} key={index} />;
            })}
          </div>
        </div>)}
        
        )
        :"no data found"
        }
      
      </div>
    </>
  );
};

export default ClientProjectList;
