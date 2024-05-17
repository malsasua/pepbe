import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { client, query, createSessionOrder } from "../data/faunadb.jsx";
import ButtonSelect from "./ButtonSelect.jsx";
import ButtonStd from "./ButtonStd.jsx";
import { allItems } from '../data/items.jsx';
import { InputStd } from './InputStd.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { allCategories } from '../data/categories.jsx';

function OpenPage() {
  const { openCode, setPepBeSession, pepBeSession,
    itemsOpen, setItemsOpen, nameOrder, setNameOrder } =
    useContext(AppContext);

  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();


  function saveSessionOrder() {
    if (nameOrder && nameOrder != 'Nombre') {
      let sessionOrder = {
        name: nameOrder,
        session: openCode,
        items: itemsOpen,
        date: pepBeSession.date
      };
      createSessionOrder(sessionOrder,
        p => {
          navigate('/finish');

        }, p => {
          setErrorMsg('Error sending data. Try again');
        });
    } else {
      setErrorMsg('Name is required');
    }
  }

  function selectItemsOpen(pItem) {
    if (itemsOpen.indexOf(pItem) < 0) {
      const vItems = [...itemsOpen, pItem]
      setItemsOpen(vItems)
    } else {
      const vItems = [...itemsOpen]
      setItemsOpen(vItems.filter(c => c !== pItem))
    }
  }

  useEffect(() => {
    // Define una función async para obtener la sesión por código
    async function getSessionByCode(sessionCode) {
      try {
        const response = await client.query(
          query.Paginate(
            query.Match(query.Ref('indexes/getSessionByCode'), [sessionCode])
          )
        );
        const poductsRef = response.data;
        const getAllDataQuery = poductsRef.map(ref => {
          return query.Get(ref);
        });

        const data = await client.query(getAllDataQuery);
        if (data.length > 0) {
          setPepBeSession(data[0].data.session);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    // Llama a la función getSessionByCode solo cuando openCode cambie
    if (openCode) {
      getSessionByCode(openCode);
    }
  }, [openCode, setPepBeSession]); // Ejecutar useEffect solo cuando openCode o setPepBeSession cambien

  useEffect(() => {
    if (nameOrder) {
      setErrorMsg('')
    }
  }, [nameOrder])
  return (
    <div>
      <div className="flex">
        <div className="text-xl p-1 mx-auto">Código {openCode} - <span className="text-xs">{pepBeSession.date}</span> </div>
        <div
          className="flex rounded-full  bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-1 shadow-lg mx-auto">
          <Link className="flex-1 font-bold text-l bg-slate-300 px-6 py-1 rounded-full"
            to='/home'>Volver</Link>
        </div>
      </div>



      <div className="mt-4 py-2 flex-auto rounded-md mx-auto bg-gradient-to-tr from-slate-200 to-slate-400 p-1 shadow-lg">

        <div className="text-center">
          <InputStd value={nameOrder} onchange={setNameOrder}
            defaultText='Nombre' />
          {errorMsg && (
            <p className="text-red-800">
              {errorMsg}</p>
          )}
        </div>
        <div className="text-l p-2">Selecciona la Consumición</div>
        <div className="grid grid-cols-3 gap-2 auto p-1 text-center">

          {
            pepBeSession.items.map(
              e => {
                const item = allItems.filter(i => {
                  return i.value == e
                })[0];
                let colCat = allCategories.find((e) => { return item.type === e.value });
                return <ButtonSelect
                  key={e}
                  name={item.name}
                  value={e}
                  colorBorder={colCat.colorBorder}
                  elems={itemsOpen}
                  func={selectItemsOpen} />
              }
            )
          }
        </div>
      </div>
      <div className="p-3">
        <ButtonStd action={() => saveSessionOrder()} name='Enviar' />
      </div>
    </div>
  );
}

export default OpenPage;