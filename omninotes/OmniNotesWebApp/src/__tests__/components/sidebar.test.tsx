import * as React from "react";
import * as renderer from "react-test-renderer";
import * as ShallowRenderer from "react-test-renderer/shallow";
import Sidebar from "../../components/sidebar";
import { Page } from "../../types/types";

describe("<Sidebar />", () => {
    const books = [{
        "title": "031302018085012PM",
        "sections": [
            {
                "title": "Untitled Section-2018-03-14T09:50:12.5986399+13:00",
                "pages": [
                    {
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
                    }
                ],
                "selfUrl": ""
            }
        ],
        "selfUrl": ""
    },
    {
        "title": "031302018085508PM",
        "sections": [
            {
                "title": "Untitled Section-031302018085508PM",
                "pages": [
                    {
                        "createDateTime": "0001-01-01T00:00:00",
                        "lastModifiedDateTime": "2018-03-16T04:37:01",
                        "title": "My New Title",
                        "body": "",
                        // tslint:disable-next-line:max-line-length
                        "selfUrl": "https://omninotes.blob.core.windows.net/notes/pavan/031302018085508PM/Untitled%20Section-031302018085508PM/Untitled%20Page-031302018085508PM",
                        "noteTitle": "031302018085508PM",
                        "sectionTitle": "Untitled Section-031302018085508PM",
                        // tslint:disable-next-line:max-line-length
                        "relativeLocation": "pavan/031302018085508PM/Untitled Section-031302018085508PM/Untitled Page-031302018085508PM"
                    }
                ],
                "selfUrl": null
            }
        ],
        "selfUrl": null
    }];
    const onbookSelect = (index: number) => {
        expect(index).toBeGreaterThanOrEqual(-1);
    };
    const sidebar = renderer.create(<Sidebar books={books} onbookSelect={onbookSelect} />);

    it("Sidebar rendered", () => {
        var json = sidebar.toJSON();
        expect(json.type).toEqual("div");
    });

    it("Sidebar book selected", () => {
        let tree = sidebar.toTree();
        tree.props.onbookSelect(0);
        tree.props.onbookSelect(1);
    });
});