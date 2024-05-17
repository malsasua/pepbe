import { client, query } from "./faunadb.jsx";

export let allItems = []

const getAllProductsQuery = client
  .query(query.Paginate(query.Match(query.Ref("indexes/getAllItems"))))
  .then((response) => {
    const poductsRef = response.data;
    const getAllDataQuery = poductsRef.map((ref) => {
      return query.Get(ref);
    });

    return client.query(getAllDataQuery).then(
      (data) => {
        data.map(r => {
          allItems.push({
            id: r.id,
            name: r.data.name,
            type: r.data.type,
            value: r.data.value
          })
        });
      });
  })
  .catch((error) => console.error("Error: ", error.message));
