import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx'

function ButtonSelect(props) {

  return (
    <div className="size-full  max-w-md mx-auto ">
      <button onClick={() => props.func(props.value)}
        className={props.elems.indexOf(props.value) >= 0
          ? 'bg-orange-500 hover:bg-orange-700 active:bg-orange-800 px-4 py-2 rounded-md text-white size-full' :
          'bg-orange-100 px-4 py-2 rounded-md opacity-50 size-full'
        }>
        <div className={"border border-" + props.colorBorder + "-500 border-l-8 rounded-md"}>
          {props.name}
        </div>
      </button>
    </div >
  )
}

export default ButtonSelect