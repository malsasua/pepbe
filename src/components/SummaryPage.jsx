import { AppContext } from '../context/AppContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { allItems } from '../data/items.jsx';
import { client, query } from "../data/faunadb.jsx";
import { Link } from 'react-router-dom';
import { WhatsappShareButton, WhatsappIcon } from "react-share";

function SummaryPage() {
  const { sessionCode, openCode, setSystemInfo, systemInfo } = useContext(AppContext);
  const [detailOrder, setDetailOrder] = useState({ session: null, detail: [] });
  const [summaryOrder, setSummaryOrder] = useState([]);

  const [countTime, setCountTime] = useState({ count: 10, numRefresh: 0 });
  const maxRefresh = 4;

  async function fetchDetailOrder(pSessionCode) {
    try {
      const response = await client.query(
        query.Paginate(query.Match(query.Ref("indexes/getAllOrdersBySession"), [pSessionCode]))
      );

      const productsRef = response.data;
      const getAllDataQuery = productsRef.map((ref) => query.Get(ref));
      const data = await client.query(getAllDataQuery);

      const parsedOrders = data.map((r) => ({
        name: r.data.sessionOrder.name,
        session: r.data.sessionOrder.session,
        date: r.data.sessionOrder.date,
        itemsName: r.data.sessionOrder.items.map(
          e => allItems.find(i => i.value === e)?.name || ''
        )
      }));

      let vDate = '';
      if (parsedOrders.length > 0) {
        vDate = parsedOrders[0].date;
      }
      setDetailOrder({
        session: pSessionCode,
        detail: parsedOrders,
        date: vDate
      });
      setCountTime({ count: 9, numRefresh: countTime.numRefresh + 1 });
    } catch (error) {
      console.error("Error fetching detail order: ", error.message);
    }
  }

  useEffect(() => {
    let intervalId;

    if (sessionCode && countTime.numRefresh <= maxRefresh) {
      // Solo iniciar el intervalo si no está ya activo
      if (!intervalId) {
        intervalId = setInterval(() => {
          setCountTime(prev => ({ ...prev, count: prev.count - 1 }));
        }, 1000);
      }

      // Ejecutar la función de búsqueda si el contador llega a cero
      if (countTime.count === 10 || countTime.count === 0) {
        fetchDetailOrder(sessionCode);
      }
    } else {
      // Detener el intervalo si se alcanza el límite máximo de actualizaciones
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [sessionCode, countTime, maxRefresh]); // Dependencias del efecto

  useEffect(() => {
    if (detailOrder.detail.length > 0) {
      const newSummaryOrder = {};
      detailOrder.detail.forEach(order => {
        order.itemsName.forEach(itemName => {
          newSummaryOrder[itemName] = (newSummaryOrder[itemName] || 0) + 1;
        });
      });
      setSummaryOrder(Object.entries(newSummaryOrder));
    }
  }, [detailOrder]);

  return (
    <div>
      <div className="flex">
        <div className="p-0">
          <WhatsappShareButton title="Compartir" url={systemInfo.url + "/" + openCode}>
            <WhatsappIcon type="button" size={33} round={true} />
          </WhatsappShareButton>
        </div>
        <div className="text-xl p-1 mx-auto">Código {openCode} - <span className="text-xs">{detailOrder.date}</span> </div>
        <div
          className="flex rounded-full  bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-1 shadow-lg mx-auto">
          <Link className="flex-1 font-bold text-l bg-slate-300 px-6 py-1 rounded-full"
            to='/home'>Volver</Link>
        </div>

      </div>
      <div className="mt-4 py-2 flex-auto rounded-md mx-auto bg-gradient-to-tr from-slate-200 to-slate-400 p-1 shadow-lg">
        <div>
          <div className="font-bold p-1">Total # {summaryOrder.reduce((total, [, qty]) => total + qty, 0)}</div>
          <div className="font-medium p-1">Resumen:</div>
        </div>
        <ul>
          {summaryOrder.map(([name, qty], index) => (
            <li key={index} className="font-semibold px-1">
              {name} - {qty}
            </li>
          ))}
        </ul>
        <div className="font-medium p-1 mt-4">Detalle:</div>
        <ul>
          {detailOrder.detail.map((order, index) => (
            <li key={index} className="font-semibold px-1">
              {order.name} - {order.itemsName.join(', ')}
            </li>
          ))}
        </ul>
        <div className="p-3">
          <div
            className="flex rounded-full mx-auto bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-1 shadow-lg mt-4">
            <button className="flex-1 font-bold text-l bg-zinc-200 px-6 py-1 rounded-full"
              onClick={() => fetchDetailOrder(sessionCode)}>
              Refresh {countTime.numRefresh <= maxRefresh ? `(${countTime.count})` : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
