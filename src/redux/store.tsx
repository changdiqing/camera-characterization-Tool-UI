import { configureStore } from "@reduxjs/toolkit";
import deviceListSliceReducer from "./deviceListSlice";
import distMeasureSliceReducer from "./distMeasureSlice";
import colorMeasureSliceReducer from "./colorMeasureSlice";
import resoMeasureSliceReducer from "./resoMeasureSlice";

export const store = configureStore({
    reducer: {
        deviceList: deviceListSliceReducer,
        distMeasure: distMeasureSliceReducer,
        colorMeasure: colorMeasureSliceReducer,
        resoMeasure: resoMeasureSliceReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
