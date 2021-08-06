/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/user';

export default function Suppliers() {
  const [user] = useContext(UserContext);
  const [data, setData] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [supplierName, setSupplierName] = useState('');

  function isJSON(d) {
    let ret = true;
    try {
      JSON.parse(d);
    } catch (e) {
      ret = false;
    }
    return ret;
  }
  useEffect(async () => {
    let isMounted = true;
    // why this(isMounted) ? because we are using aync function here, we might get result at the time of unmounting of the component, at that stage we can't/shouldn't update the state.
    const myHeaders = new Headers();

    if (isJSON(user)) myHeaders.append('x-access-token', `${JSON.parse(user).accessToken}`);
    else myHeaders.append('x-access-token', user.accessToken);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(`${process.env.REACT_APP_BASE_URL}/suppliers`, requestOptions)
      .then((response) => response.text())
      .then((result) => { if (isMounted) setData(JSON.parse(result)); })
      .catch((error) => console.log('error', error));

    return () => { isMounted = false; };
  }, [supplier]);

  /// This need be a seperate component(maybe !!!)

  const addSuppliers = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    if (isJSON(user)) myHeaders.append('x-access-token', `${JSON.parse(user).accessToken}`);
    else myHeaders.append('x-access-token', user.accessToken);

    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('name', supplierName);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/suppliers`, requestOptions)
      .then((response) => response.text())
      .then((result) => setSupplier(supplierName))
      .catch((error) => console.log('error', error));
  };
  return (
    <div className="mt-5 pt-5 container">
      <div className="row">
        <div className="col-12">
          <h1>Suppliers</h1>
          <form onSubmit={addSuppliers}>
            <input type="text" placeholder="Supplier's name" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
            <input type="submit" />
          </form>
          <div>{data.map((d, index) => <p key={`supplier-${index}`}>{d.name}</p>)}</div>

        </div>
      </div>
    </div>
  );
}
