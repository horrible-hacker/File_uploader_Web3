import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => 
  {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        
      } else {
        dataArray = await contract.display(account);
        
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray ?? {}).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      
      
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <div>
            <img
              key={i}
              src="/file_image.png"
              alt={`${i}`}
              className="image-list"
            ></img>
            <span className="file-name">{i}</span>
            </div>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
