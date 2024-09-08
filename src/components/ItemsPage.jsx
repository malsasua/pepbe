import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import ButtonSelect from './ButtonSelect.jsx';
import ButtonStd from './ButtonStd.jsx';
import { allItems } from '../data/items.jsx';
import { createSession } from "../data/faunadb.jsx";
import { Link, useNavigate } from 'react-router-dom';
import { dateInYyyyMmDdHhMm } from '../utils/utils.js'
import { allCategories } from '../data/categories.jsx';

function ItemsPage() {
  const { categories, itemsNew, selectItemNew,
    sessionCode, setSessionCode, setOpenCode,
    setUrlCode } = useContext(AppContext);
  const [itemsSel, setItemsSel] = useState([]);
  const [textButton, setTextButton] = useState('New PepBe');
  const navigate = useNavigate();

  useEffect(() => {
    let newItemsSel = [];
    categories.forEach((c) => {
      let colCat = allCategories.find((e) => { return c === e.value });
      const itemsCat = allItems.filter((f) => f.type === c);
      const itemsCatWithColor = itemsCat.map(e => { return { ...e, 'colorBorder': colCat.colorBorder }; });
      newItemsSel = newItemsSel.concat(itemsCatWithColor);
    });
    setItemsSel(newItemsSel);
  }, [categories]); // Update itemsSel when categories change

  useEffect(() => {
    if (sessionCode === undefined)
      setTextButton('Crear Ronda');
    else
      setTextButton("Codigo: " + sessionCode);
  }, [sessionCode])

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const newCode = getRandomInt(999999);

  return (
    <div>
      <div className="flex">
        <div className="text-xl p-1 mx-auto">Nueva Ronda</div>
        <div
          className="flex rounded-full  bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-1 shadow-lg mx-auto">
          <Link className="flex-1 font-bold text-l bg-slate-300 px-6 py-1 rounded-full"
            to='/new'>Volver</Link>
        </div>
      </div>
      <div className="p-3">
        <ButtonStd
          action={() => {
            if (sessionCode === undefined) {
              createSession(
                {
                  code: newCode.toString(),
                  items: itemsNew,
                  categories: categories,
                  date: dateInYyyyMmDdHhMm(new Date())
                },
                (p) => {
                  setSessionCode(p);
                  setOpenCode(p);
                  setUrlCode(p);
                },
                (m) => {
                  console.log(m);
                }
              )
            } else {
              navigate('/summary');
            }
          }}
          name={textButton}
        />
      </div>
      <div className="mt-4 py-2 flex-auto rounded-md mx-auto bg-gradient-to-tr from-slate-200 to-slate-400 p-1 shadow-lg">
        <div className="text-l p-1">Elige los productos seleccionables (por defecto todos) </div>
        <div className="grid grid-cols-3 gap-2 auto p-1 text-center">

          {itemsSel.map((e) => (
            <ButtonSelect
              key={e.value}
              name={e.name}
              value={e.value}
              colorBorder={e.colorBorder}
              elems={itemsNew}
              func={selectItemNew} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemsPage;