import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { client, query } from "../data/faunadb.jsx";
import ButtonStd from './ButtonStd.jsx';

import InputStdHome from './InputStdHome.jsx';

function HomePage() {
  const navigate = useNavigate();
  const { openCode, setOpenCode, setItemsOpen, setNameOrder,
    setSessionCode, urlCode, setUrlCode } = useContext(AppContext);

  const [formData, setFormData] = useState({
    openCode,
    errors: {},
  });
  const { setSystemInfo } = useContext(AppContext);

  const params = useParams();

  async function getSystemInfo() {
    try {
      const response = await client.query(
        query.Paginate(
          query.Match(query.Ref('indexes/getSystemInfo'))
        )
      );
      const systemInfoRef = response.data;
      const getAllDataQuery = systemInfoRef.map(ref => {
        return query.Get(ref);
      });

      const data = await client.query(getAllDataQuery);
      if (data.length > 0) {
        return data[0].data;
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (formData.openCode) {
      validateForm();
    }
  };

  const validateForm = () => {
    const errors = {};

    // Check if username is empty
    if (!formData.openCode) {
      errors.openCode = "Session Code is required";
    }

    setFormData((prevState) => ({ ...prevState, errors }));

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setOpenCode(formData.openCode);
      setItemsOpen([]);
      setNameOrder('');
      if (document.activeElement.value === "Añadir Consumición") {
        setOpenCode(formData.openCode);
        setUrlCode(formData.openCode);
        setItemsOpen([]);
        setNameOrder('');
        navigate('/open');
      } else if (document.activeElement.value === "Ver Ronda") {
        let vSystemInfo = await getSystemInfo();
        setSystemInfo(vSystemInfo);
        setSessionCode(formData.openCode);
        setUrlCode(formData.openCode);
        navigate('/summary');
      };
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    if (params.codeId) {
      setUrlCode(params.codeId);
      setFormData((prevState) => ({ ...prevState, openCode: params.codeId }));
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <ButtonStd
          action={async () => {
            let vSystemInfo = await getSystemInfo();
            setSystemInfo(vSystemInfo);
            setFormData({ openCode: undefined });
            navigate('/new');
          }}
          name='Crear Nueva Ronda'
        />


        <div className="mt-4 py-2 flex-auto rounded-md mx-auto bg-gradient-to-tr from-slate-200 to-slate-400 p-1 shadow-lg">
          <label>
            <div className="flex-1 font-bold text-l text-center">
              Abrir Ronda
            </div>
            <div className="text-center">
              <InputStdHome
                name="openCode"
                value={formData.openCode}
                onchange={() => handleChange(event)}
                defaultText='Código Ronda'
                defaultValue={urlCode}
              />
              {formData.errors.openCode && (
                <p className="text-red-800">
                  {formData.errors.openCode}</p>
              )}
            </div>
          </label>
          <br></br>
          <div className='flex'>
            <div
              className="flex rounded-full mx-auto bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-1 shadow-lg">
              <input className="flex-auto font-bold text-l text-center bg-zinc-200 px-6 py-1 rounded-full"
                type="submit"
                value="Añadir Consumición" />
            </div>
            <div
              className="flex rounded-full mx-auto bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-1 shadow-lg">
              <input className="flex-1 font-bold text-l text-center bg-zinc-200 px-6 py-1 rounded-full"
                type="submit"
                value="Ver Ronda" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default HomePage