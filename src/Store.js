import { configureStore } from "@reduxjs/toolkit";
import login from "./pages/login/ReducerLogin";
import address from "./pages/address/AddressReducer";
import department from "./pages/departments/RegionDepartmentReducer";
import age from "./pages/age/AgeReducer";
import product from "./pages/product/ProductReducer";
import mtt from "./pages/mtt/MttReducer";
import file from "./pages/FilesReducer";
import meal from "./pages/meal/MealReducer";
import mealCategory from "./pages/meal/MealCategoryReducer";
import mealTime from "./pages/meal/MealTimeReducer";
import multiMenu from "./pages/multimenu/MultiMenuReducer";
import sanpinCategory from "./pages/product/SanpinCategoryReducer";
import userMenu from "./pages/fromUser/reducers/UserMenuReducer";
import kindergarten from "./pages/kindergarten/KindergartenReducer";
import user from "./pages/fromUser/reducers/UserInfoReducer";
import childrenNumber from "./pages/fromUser/reducers/ChildrenNumberReducer";
import children from "./pages/fromUser/reducers/ChildrenReducer";
import balance from "./pages/fromUser/reducers/BalanceREducer";
import received from "./pages/fromUser/reducers/ReceivedReducer";
import report from "./pages/report/ReportReducer";
import area from "./pages/area/AreaReducer";
import Api from "./Api"

export default configureStore({
    reducer: {
        login,
        address,
        department,
        age,
        product,
        sanpinCategory,
        mtt,
        mealCategory,
        meal,
        mealTime,
        multiMenu,
        userMenu,
        user,
        kindergarten,
        childrenNumber,
        received,
        file,
        children,
        balance,
        report,
        area
    },
    middleware: [Api],
});
