function ButtonStd(props) {
  return (
    <div
      className="flex rounded-full mx-auto bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-1 shadow-lg">
      <button onClick={props.action} className="flex-1 font-bold text-l bg-zinc-200 px-6 py-1 rounded-full">
        {props.name}
      </button >
    </div >
  )
}

export default ButtonStd