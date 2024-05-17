import faunadb from "faunadb";

const client = new faunadb.Client({
  secret: "fnAFea-jjcAA0CZr3DizJU71-IYSm4-o3unfze0M",
  domain: "db.eu.fauna.com",
  scheme: "https",
  keepAlive: false,
});
const query = faunadb.query;

function createSession(session, callback, callbackerror) {
  client.query(
    query.Create(query.Collection('session'), {
      // data to save
      data: {
        session,
      },
    })
  )
    .then(
      ret => {
        callback(session.code);
        return ret;
      })
    .catch(error => {
      console.error('Error: ', error.message);
      callbackerror(error.message)
    });
}

function createSessionOrder(sessionOrder, callback, callbackerror) {
  client.query(
    query.Create(query.Collection('sessionOrder'), {
      // data to save
      data: {
        sessionOrder,
      },
    })
  )
    .then(
      ret => {
        callback(sessionOrder.name);
        return ret;
      })
    .catch(error => {
      console.error('Error: ', error.message);
      callbackerror(error.message)
    });
}

export { client, query, createSession, createSessionOrder };
