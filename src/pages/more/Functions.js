import {toast} from "react-toastify";
import React from "react";
import LoadingStop from "./LoadingStop";
import axios from "axios";
import {baseUrl, baseUrl2} from "../../Default";

export const getToken = () => {
    return localStorage.getItem("Authorization");
}
export const getRoleStorage = () => {
    return localStorage.getItem("role");
}
export const stopLoading = () => {
   return <LoadingStop state={false}/>;
}
export const pushToLogin = () => {
    localStorage.setItem("Authorization","");
    localStorage.setItem("role","");
    localStorage.setItem("Refresh","");
    window.history.pushState("object or string", "Title", "/");
    window.location.reload();
}

export const checkRoleFromNav = () => {
       let name = localStorage.getItem("role");
    if (name === "ROLE_OSHPAZ"){
        return true;
    } else {
        return false;
    }
}

export const toastError = (error) => {
    toast.error(error?.response?.data?.text);
    toast.error(error?.response);
    toast.error(error?.response?.error);
    toast.error(!error?.response?.data?.text ? error.message + "\n  " + error.code : undefined);
}
export const colorTextStr = (num) => {
    if ( num < 101 && num > 89) {
        return 'rgba(115,227,107,0.56)';
    } else if (num < 89 && num > 70) {
        return 'rgba(227, 223, 107, 0.69)';
    } else {
        return 'rgba(227,143,141,0.56)';
    }
}

export const checkSame = (array, data, paramA, paramB) => {
    let has = false;
    array.forEach(item => {
        if (item[paramA] === data[paramB]) {
            has = true;
        }

    })
    return has;
}
export const deleteSame = (array, data, paramA, paramB) => {
    return array.filter(item =>
        item[paramA] !== data[paramB]
    )
}

export const tableRowCustomTd3 = (maiList) => {
    return (
        maiList?.map((item, index) => {
                if (index !== 0) {
                    return (
                        <tr key={("a" + index) + 1}>
                            <td>{item.ageGroupName}</td>
                            <td>{item.weight}</td>
                        </tr>
                    );
                }
            }
        ));
}

export const colorFunc = (item, index) => {
    if (index === 6 || index === 5) {
        return {backgroundColor: '#fcd6d6'}
    } else {
        return null
    }
}
export const monthName = (number) => {
    // eslint-disable-next-line default-case
  switch (number) {
      case 1:
         return  "Yanvar";
      case 2:
         return  "Fevral";
      case 3:
         return  "Mart";
      case 4:
         return  "Aprel";
      case 5:
         return  "May";
      case 6:
         return  "Iyun";
      case 7:
         return  "Iyul";
      case 8:
         return  "Avgust";
      case 9:
         return  "Setabr";
      case 10:
         return  "Oktabr";
      case 11:
         return  "Noyabr";
      case 12:
         return  "Dekabr";

  }
}
export const TimestampToInputDate = (time, name) => {
    if (time) {
        return new Date(time)?.getFullYear() + "-" + ((new Date(time)?.getMonth() + 1) < 9 ? "0" + (new Date(time)?.getMonth() + 1) : (new Date(time)?.getMonth() + 1)) + "-" + (parseInt(new Date(time)?.getDate()) > 9 ? new Date(time)?.getDate() : ("0" + new Date(time)?.getDate()))
    } else {
        return '';
    }
}

export const getFileWithUrl = (url,name) => {
    const FileDownload = require('js-file-download');
    axios({
        // url: "https://mtt-menyu.uz/"+url,
        url:baseUrl2()+url,
        method: 'GET',
        responseType: 'blob', // Important
    }).then((response) => {
        // setFileType(response.data);
        // console.log(response.data)
        FileDownload(response.data,`${name}.pdf`);
    });

}
