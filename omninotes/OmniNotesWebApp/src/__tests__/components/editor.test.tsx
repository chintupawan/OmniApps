import * as React from "react";
import * as renderer from "react-test-renderer";
import * as ShallowRenderer from "react-test-renderer/shallow";
import Editor from "../../components/editor";
import { Page } from "../../types/types";

const mockPage = {
    "createDateTime": "0001-01-01T00:00:00",
    "lastModifiedDateTime": "2018-03-13T20:50:13",
    "title": "Untitled Page-2018-03-14T09:50:12.5986399+13:00",
    "body": "Test",
    // tslint:disable-next-line:max-line-length
    "selfUrl": "https://omninotes.blob.core.windows.net/notes/pavan/031302018085012PM/Untitled%20Section-2018-03-14T09:50:12.5986399+13:00/Untitled%20Page-2018-03-14T09:50:12.5986399+13:00",
    "noteTitle": "031302018085012PM",
    "sectionTitle": "Untitled Section-2018-03-14T09:50:12.5986399+13:00",
    // tslint:disable-next-line:max-line-length
    "relativeLocation": "pavan/031302018085012PM/Untitled Section-2018-03-14T09:50:12.5986399+13:00/Untitled Page-2018-03-14T09:50:12.5986399+13:00"
};

describe("Editor Component", () => {
    const onpageTitleChange = (title: string) => {
        // tslint:disable-next-line:no-console
        expect(title).toEqual("new title");
    };
    const editor = renderer.create(
        <Editor page={mockPage} onpageTitleChange={onpageTitleChange} />
    );
    const shallowRenderer = ShallowRenderer.createRenderer();
    shallowRenderer.render(<Editor page={mockPage} onpageTitleChange={onpageTitleChange} />);

    it("Editor rendered", () => {
        let json = editor.toJSON();
        expect(json.type).toEqual("div");
        expect(json.children.length).toEqual(3);
        expect(json.children).toHaveLength(3);
    });
    it("Editor trigger onpageTitleChange", () => {
        let tree = editor.toTree();
        tree.props.onpageTitleChange("new title");
    });
    it("Editor shallow rendered", () => {
        const result = shallowRenderer.getRenderOutput();
        expect(result.type).toEqual("div");
    });
   
});
