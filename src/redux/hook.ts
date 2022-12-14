import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RoomState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RoomState> = useSelector;
