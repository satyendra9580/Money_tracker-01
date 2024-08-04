import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransaction().then(setTransactions);
  }, []);

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_URL + '/api/transaction';
    const price = parseFloat(name.split(' ')[0]); 

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price,
        name: name.substring(price.toString().length + 1),
        description,
        datetime
      })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(json => {
      setName("");
      setDescription("");
      setDatetime("");
      console.log('result', json);
      setTransactions([...transactions, json]);
    }).catch(error => {
      console.error('Error:', error.message);
    });
  }

  async function getTransaction() {
    const url = process.env.REACT_APP_URL + '/api/transactions';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }

  return (
    <main>
      <h1>${balance}<span>.00</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            placeholder="+200 Item"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)} />
        </div>
        <div className="description">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add New Transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => (
          <div key={transaction._id} className="transaction">
            <div className="left">
              <div className="basic">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price" + (transaction.price < 0 ? 'red' : 'green')}>{transaction.price}</div>
              <div className="dateTime">{transaction.datetime}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
export default App;
