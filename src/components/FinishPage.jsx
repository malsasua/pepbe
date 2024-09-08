import React from 'react'
import { AppContext } from '../context/AppContext.jsx';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { allItems } from '../data/items.jsx';

import ButtonStd from "./ButtonStd.jsx";

function FinishPage() {
  const { itemsOpen, nameOrder, openCode, setOpenCode,
    pepBeSession } =
    useContext(AppContext);
  const navigate = useNavigate();
  const goToNewPage = () => {
    navigate('/home');
  }


  return (
    <div>
      <div className="font-semibold">Código {openCode} - <span className="text-xs">{pepBeSession.date}</span></div>
      <hr />
      <div className="mt-4 py-2 flex-auto rounded-md mx-auto bg-gradient-to-tr from-slate-200 to-slate-400 p-1 shadow-lg">
        <div className="font-semibold p-1">Nombre: {nameOrder}</div>
        <div className="font-medium p-1">{itemsOpen.map(
          e => {
            const item = allItems.filter(i => {
              return i.value == e
            })[0]
            return "\r\n" + item.name + "\r\n"
          }
        )}</div>
        <div className="p-3">
          <ButtonStd action={() => goToNewPage()} name='Volver' />
        </div>
      </div>
    </div >
  )
}

export default FinishPage