import React from 'react';
import CustomTabs from "../more/CustomTabs";
import OneDayWithMttFromUsers from "./OneDayWithMttFromUsers";
import Product from "../fromUser/Product";

function Menues(props) {
    const [currentTabs, setCurrenTabs] = React.useState(0);
    return (
        <div>
            <CustomTabs list={[ {name: "Kunlik menyular"},{name: "Menyu tanlash"}]}
                        currentNum={setCurrenTabs}/>
            <div className={"p-3"}>
                {currentTabs === 0 ? <><OneDayWithMttFromUsers/></> : null}
                {currentTabs === 1 ? <><Product/></> : null}
            </div>

        </div>
    );
}

export default Menues;
