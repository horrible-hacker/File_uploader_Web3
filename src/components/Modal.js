import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({setModalOpen,contract})=>{
    const [buttonClicked,setButton] = useState(false);
    const sharing  = async ()=>{
        try{
            
            const address = document.querySelector(".address").value;
            await contract.allow(address);
            
            setButton(buttonClicked => !buttonClicked);
        }
        catch(e)
        {
            console.log(e);
        }
    };
    const disallow = async ()=>{
        try{
            
            const address = document.querySelector(".address").value;
            await contract.disallow(address);
            
            setButton(buttonClicked => !buttonClicked);
        }
        catch(e)
        {
            console.log(e);
        }
    };
    useEffect(()=>{
        const accessList = async() =>
            {
                const address = await contract.shareAccess();
                let select = document.querySelector("#selectNumber");
                while (select.options.length > 1) {
                        select.remove(1);
                    }
                const options = address;
                
                for(let i=0;i<options.length;i++)
                {
                    let opt = options[i];
                    
                    if(opt[1])
                    {
                        let e1 = document.createElement("option");
                        e1.textContent = opt[0];
                        e1.value = opt[0];
                        select.appendChild(e1);
                    }
                }
            }
            
            contract && accessList();
    },[]);
    return <>
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="title"> Share with</div>
                <div className="body">
                    <input type="text" className="address" placeholder="Enter address">
                    </input>
                    <form id="myForm">
                        <select id="selectNumber">
                            <option className="address">People with access</option>
                        </select>
                    </form>
                </div>
                    <div className="footer">
                        <button onClick={()=>{setModalOpen(false)}} id="cancelBtn">Cancel Button</button>
                        <button onClick={()=>sharing()} id = "shareBtn">Share</button>
                        <button onClick={()=>disallow()} id = "unsharBtn">Unshare</button>
                    </div>
                
        </div>
    </div>
    </>;
};
export default Modal;