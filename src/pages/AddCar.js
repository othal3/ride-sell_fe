import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import useSession from "../hooks/useSession";
import { useNavigate } from "react-router-dom";
const car = require("../data/Car_Model_List.json");

function AddCar() {
   const navigate = useNavigate();
   const session = useSession();
   const [selectedMake, setSelectedMake] = useState("");
   const [selectedModel, setSelectedModel] = useState("");
   const [allModel, setAllModel] = useState([]);
   const [selectedYear, setSelectedYear] = useState("");
   const [allYear, setAllYear] = useState([]);
   const [formData, setFormData] = useState(null);

   const make = Array.from(new Set(car.results.map((car) => car.Make)));

   const handleMakeChange = (e) => {
      setSelectedMake(e.target.value);
   };

   const handleModelChange = (e) => {
      setSelectedModel(e.target.value);
   };

   const handleYearChange = (e) => {
      setSelectedYear(e.target.value);
   };

   useEffect(() => {
      if (selectedMake !== "") {
         const model = Array.from(
            new Set(
               car.results
                  .filter((car) => car.Make === selectedMake)
                  .map((car) => car.Model)
            )
         );
         setAllModel([...model]);
      }
   }, [selectedMake]);

   useEffect(() => {
      if (selectedModel !== "") {
         const year = Array.from(
            new Set(
               car.results
                  .filter((car) => car.Model === selectedModel)
                  .map((car) => car.Year)
            )
         );
         setAllYear([...year]);
      }
   }, [selectedModel]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const onSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/post/create/${session.id}`,
            {
               headers: {
                  "Content-Type": "application/json",
               },
               method: "POST",
               body: JSON.stringify(formData),
            }
         );
         const data = await response.json();

         if (response.ok) {
            navigate(`/postPage?id=${data.post._id}`);
         }
      } catch (e) {
         console.error(e);
      }
   };

   return (
      <MainLayout>
         <div className=" flex justify-center">
            <form className="addCarForm" onSubmit={onSubmit}>
               <div className="flex">
                  <div className="flex flex-col basis-1/3">
                     <select
                        name="make"
                        value={selectedMake}
                        onChange={handleMakeChange}
                        onBlur={handleInputChange}
                     >
                        <option>Marca</option>
                        {make.map((make, index) => (
                           <option key={index} value={make}>
                              {make}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="flex flex-col basis-1/3">
                     <select
                        name="model"
                        value={selectedModel}
                        onChange={handleModelChange}
                        onBlur={handleInputChange}
                     >
                        <option>Modello</option>
                        {allModel.map((model, index) => (
                           <option key={index} value={model}>
                              {model}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="flex flex-col basis-1/3">
                     <select
                        name="year"
                        value={selectedYear}
                        onChange={handleYearChange}
                        onBlur={handleInputChange}
                     >
                        <option>Anno</option>
                        {allYear.map((year, index) => (
                           <option key={index} value={year}>
                              {year}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
               <label>Cilindrata</label>
               <input
                  name="engine"
                  type="number"
                  onChange={handleInputChange}
               />
               <label>Carburante</label>
               <input name="fuelType" onChange={handleInputChange} />
               <label>Potenza in Kw</label>
               <input name="power" type="number" onChange={handleInputChange} />
               <label>Chilometraggio</label>
               <input name="km" type="number" onChange={handleInputChange} />
               <label>Prezzo</label>
               <input name="price" type="number" onChange={handleInputChange} />
               <label>Descrizzione</label>
               <input
                  name="description"
                  className=" h-32 "
                  onChange={handleInputChange}
               />
               <button type="submit">Carica Post</button>
            </form>
         </div>
      </MainLayout>
   );
}

export default AddCar;
