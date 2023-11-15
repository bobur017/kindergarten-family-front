import React from 'react';

function CustomTabs({list, currentNum}) {
    const [state, setState] = React.useState(0);
    const clickedTabs = (num) => {
      setState(num);
      currentNum(num);
    }
    return (
        <div className={"w-100 d-flex justify-content-center p-2 myBgColor upLine"}>
            {
                list?.map((item, index) =>
                    <div key={index} className={state === index ?"tabsActive mx-2":"tabsInActive mx-2"} onClick={()=>clickedTabs(index)}>
                        <div>{item?.name}</div>
                    </div>
                )
            }
        </div>
    );
}

export default CustomTabs;
