import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { allCategories } from '../data/categories.jsx'
import { allItems } from '../data/items.jsx'
import ButtonSelect from './ButtonSelect.jsx'
import ButtonStd from './ButtonStd.jsx'
import { Link, useNavigate } from 'react-router-dom'


function NewPage() {
  const { categories, selectCategory, setSessionCode } = useContext(AppContext);
  const { setItemsNew } = useContext(AppContext);
  const navigate = useNavigate();
  const goToItemsPage = () => {
    setSessionCode(undefined);
    let newItemsSelected = []
    categories.map(c => {
      allItems.filter(f => {
        return f.type === c
      }).map(i => newItemsSelected.push(i.value))
    });
    setItemsNew(newItemsSelected);
    navigate('/items');
  }


  return (
    <div>
      <div className="flex">
        <div className="text-xl p-1 mx-auto">Nueva Ronda</div>
        <div
          className="flex rounded-full  bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-1 shadow-lg mx-auto">
          <Link className="flex-1 font-bold text-l bg-slate-300 px-6 py-1 rounded-full"
            to='/pepbe'>Volver</Link>
        </div>
      </div>

      <div className="mt-4 py-2 flex-auto rounded-md mx-auto bg-gradient-to-tr from-slate-200 to-slate-400 p-1 shadow-lg">
        <div className="text-l p-1">Selecciona las Categorías</div>
        <div className="grid grid-cols-3 gap-2 auto p-1 text-center">
          {allCategories.map(e => {
            return <ButtonSelect
              key={e.value}
              name={e.name}
              value={e.value}
              colorBorder={e.colorBorder}
              elems={categories}
              func={selectCategory} />
          })}
        </div>
        <div className="p-3">
          <ButtonStd action={() => goToItemsPage()} name='Siguiente' />

        </div>
      </div>
    </div>
  )
}

export default NewPage