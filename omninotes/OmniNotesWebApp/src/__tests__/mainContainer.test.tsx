import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import * as ShallowRenderer from "react-test-renderer/shallow";
import rootReducer from "../reducers/reducers";
import MainContainer from "../containers/mainContainer";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

describe("MainContainer", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render( <Provider store={store}><MainContainer /></Provider>, div);
    });

    const shallowRenderer = ShallowRenderer.createRenderer();
    shallowRenderer.render(<MainContainer store={store} />);
    const result = shallowRenderer.getRenderOutput();
    // tslint:disable-next-line:no-console
    console.log(result);
});
