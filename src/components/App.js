import React from 'react';
import api from "../utils/api";
import Name from "./Name";

function App() {

  const [names, setNames] = React.useState([]);
  const [totalPages, setTotalPages] =  React.useState();


  React.useEffect(() => {
    api.getPages()
        .then((pagesData) => {
          const pages = pagesData.total_count;
          let totalPages = 0;
          const remains = pages % 50;
          if (remains > 0 ) totalPages = (pages - remains) / 50 + 1;
          else totalPages = (pages - remains) / 50;
          setTotalPages(totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

    React.useEffect(() => {
        const fetchArr = [];
        for (let i = 1; i < totalPages; i++) {
            fetchArr.push(api.getPage(i));
        }

        Promise.all(fetchArr)
            .then(values => {
                setNames(values.map(value => value.items.map(item => item.name)))
            })
            .catch((err) => { console.log(err);})
    }, [totalPages]);

  return (
    <div className="page">
      <h1>Имена</h1>
        {names.map((name, i) => (
            <Name key={i} name={name} />
        ))}
    </div>
  );
}

export default App;
