import { Book } from "../types/types";

export const updatePageTitle = (bookIndex: number, pageIndex: number, title: string, books: Array<Book>): any => {
    books[bookIndex].sections[0].pages[pageIndex].title = title;
    return books;
};

export const fetchDummyData = (): Array<Book> => {
    const dummyData = [  
        {  
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
        },
        {  
           "title": "MyFirstOmniNotes1",
           "sections": [  
              {  
                 "title": "Untitled Section-MyFirstOmniNotes1",
                 "pages": [  
                    {  
                       "createDateTime": "0001-01-01T00:00:00",
                       "lastModifiedDateTime": "2018-03-16T04:26:44",
                       "title": "Untitled Page-MyFirstOmniNotes1",
                       "body": "",
                       // tslint:disable-next-line:max-line-length
                       "selfUrl": "https://omninotes.blob.core.windows.net/notes/pavan/MyFirstOmniNotes1/Untitled%20Section-MyFirstOmniNotes1/Untitled%20Page-MyFirstOmniNotes1",
                       "noteTitle": "MyFirstOmniNotes1",
                       "sectionTitle": "Untitled Section-MyFirstOmniNotes1",
                       // tslint:disable-next-line:max-line-length
                       "relativeLocation": "pavan/MyFirstOmniNotes1/Untitled Section-MyFirstOmniNotes1/Untitled Page-MyFirstOmniNotes1"
                    }
                 ],
                 "selfUrl": null
              }
           ],
           "selfUrl": null
        },
        {  
           "title": "Unknown",
           "sections": [  
              {  
                 "title": "Unknown",
                 "pages": [  
                    {  
                       "createDateTime": "0001-01-01T00:00:00",
                       "lastModifiedDateTime": "2018-03-11T22:02:45",
                       "title": "Unknown",
                       "body": "",
                       "selfUrl": "https://omninotes.blob.core.windows.net/notes/pavan/Sec1/Page1.txt",
                       "noteTitle": "Unknown",
                       "sectionTitle": "Unknown",
                       "relativeLocation": "pavan/Sec1/Page1.txt"
                    },
                    {  
                       "createDateTime": "0001-01-01T00:00:00",
                       "lastModifiedDateTime": "2018-03-11T21:32:57",
                       "title": "Unknown",
                       "body": "",
                       "selfUrl": "https://omninotes.blob.core.windows.net/notes/pavan/Sec1/Page2.txt",
                       "noteTitle": "Unknown",
                       "sectionTitle": "Unknown",
                       "relativeLocation": "pavan/Sec1/Page2.txt"
                    }
                 ],
                 "selfUrl": null
              }
           ],
           "selfUrl": null
        }
     ];
    return dummyData;
};

export const addNewBook = (newBook: Book, books: Array<Book>): Array<Book> => {
    return books.concat(newBook);
};
