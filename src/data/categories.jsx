import { client, query } from "./faunadb.jsx";

export let allCategories = []

const getAllCatQuery = client
  .query(query.Paginate(query.Match(query.Ref("indexes/allCategories"))))
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