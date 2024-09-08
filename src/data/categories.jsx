import { client, query } from "./faunadb.jsx";

export let allCategories = []


const getAllCatQuery = client
  .query(
    query.Map(
      query.Paginate(query.Match(query.Index("allCategoriesSortBySeq2"))),
      query.Lambda("arr", query.Get(query.Select([2], query.Var("arr"))))
    )
  )
  .then((response) => {
    response.data.forEach(
      r => {
        allCategories.push({
          name: r.data.name,
          value: r.data.value,
          colorBorder: r.data.color
        })
      }
    );
  })
  .catch((error) => {
    console.error("Error fetching categories:", error);
  });


/*
const getAllCatQuery = client
  .query(query.Paginate(query.Match(query.Index("allCategoriesSortBySeq"))))
  .then((response) => {
    const categoriesRef = response.data;
    const getAllDataQuery = categoriesRef.map((ref) => {
      return query.Get(query.Select([2], query.Var(ref)));
    });

    return client.query(getAllDataQuery).then(
      (data) => {
        data.map(r => {
          allCategories.push({
            name: r.data.name,
            value: r.data.value,
            colorBorder: r.data.color
          })
        });
      });
  })
  .catch((error) => console.error("Error: ", error.message));

*/

/*

Map(
  Paginate(Match(Index("allCategoriesSortBySeq2"))),
  Lambda("arr", Get(Select([2], Var("arr"))))
)


const getAllCatQuery = client
.query(query.Paginate(query.Match(query.Ref("indexes/allCategories"))))
//.query(query.Paginate(query.Match(query.Ref("indexes/allCategoriesSortBySeq"))))
.then((response) => {
  const categoriesRef = response.data;
  const getAllDataQuery = categoriesRef.map((ref) => {
    return query.Get(ref);
  });

  return client.query(getAllDataQuery).then(
    (data) => {
      data.map(r => {
        allCategories.push({
          name: r.data.name,
          value: r.data.value,
          colorBorder: r.data.color
        })
      });
    });
})
.catch((error) => console.error("Error: ", error.message));
*/