import {
    FaHome,
    FaNetworkWired,
    FaUserAlt
} from "react-icons/fa";
import React from "react";
import { GiMeal, GiShoppingCart } from "react-icons/gi";
import { TbNumbers } from "react-icons/tb";
import {CgMenuHotdog} from "react-icons/cg";

export const rolesList = (role) => {
    if (role === "ROLE_ADMIN") {
        return [
            {
                path: "/sidebar/admin",
                name: "About",
                icon: <FaUserAlt />
            },
            {
                path: "/sidebar/admin/product",
                name: "Mahsulotlar",
                icon: <GiShoppingCart />
            },
            {
                path: "/sidebar/admin/age",
                name: "Yosh toifalari",
                icon: <TbNumbers />
            },
            {
                path: "/sidebar/admin/meal",
                name: "Taom",
                icon: <GiMeal />
            },
            // {
            //     path: "/sidebar/admin/department",
            //     name: "Bo'linmalar",
            //     icon: <FaNetworkWired />
            // },
            {
                path: "/sidebar/admin/multiMenu",
                name: "Taomnomalar",
                icon: <CgMenuHotdog />
            },

        ];
    } else if (role === "ROLE_SUPER_ADMIN") {
        return [
            {
                path: "/sidebar/super-admin",
                name: "Bosh sahifa",
                icon: <FaHome />
            },
            {
                path: "/sidebar/region-department",
                name: "Boshqarmalar",
                icon: <FaNetworkWired />
            },
        ];
    }
}
