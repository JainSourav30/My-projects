import { useContext } from "react";
import TagSpendingContext from "./TagSpendingContext.jsx";

export function useTagSpending() {
    return useContext(TagSpendingContext);
}