import { createContext, useState } from "react"

export const AppContext = createContext()

export function AppContextProvider(props) {
  const [categories, setCategories] = useState([])
  const [itemsNew, setItemsNew] = useState([])
  const [sessionCode, setSessionCode] = useState();
  const [openCode, setOpenCode] = useState('');
  const [pepBeSession, setPepBeSession] =
    useState({ code: "0", items: [] });
  const [itemsOpen, setItemsOpen] = useState([]);
  const [nameOrder, setNameOrder] = useState('');
  const [systemInfo, setSystemInfo] = useState();
  const [urlCode, setUrlCode] = useState('');


  function selectItemNew(pItem) {
    if (itemsNew.indexOf(pItem) < 0) {
      const vItems = [...itemsNew, pItem]
      setItemsNew(vItems)
    } else {
      const vItems = [...itemsNew]
      setItemsNew(vItems.filter(c => c !== pItem))
    }
  }

  function selectCategory(pCat) {
    if (categories.indexOf(pCat) < 0) {
      const vCat = [...categories, pCat]
      setCategories(vCat)
    } else {
      const vCat = [...categories]
      setCategories(vCat.filter(c => c !== pCat))
    }
  }

  return (
    <AppContext.Provider value={{
      categories, selectCategory, selectItemNew, itemsNew,
      setItemsNew, sessionCode, setSessionCode, openCode, setOpenCode,
      pepBeSession, setPepBeSession, itemsOpen, setItemsOpen,
      nameOrder, setNameOrder, setSystemInfo, systemInfo,
      urlCode, setUrlCode
    }}>
      {props.children}
    </AppContext.Provider>
  )
}