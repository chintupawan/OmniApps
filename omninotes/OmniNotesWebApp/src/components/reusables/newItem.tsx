import * as React from "react";
export const newItem = (type: string) => {
    let labelText = type === "newBook" ? "New Book Title" : "New Page Title";
    return (
        <div className="container-fluid">
            <form>
                <div className="row">
                    <label htmlFor="newItemTextBox">{labelText}</label>
                    <input id="newItemTextBox" type="text" name="{type}" />
                </div>
                <div className="row">
                    <input type="submit" name="save" value="Add" />
                </div>
            </form>
        </div>
    );
};