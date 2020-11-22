import React from "react";
import Rest from "./rest";
import ReactLoading from 'react-loading';
import {Link} from 'react-router-dom'
const baseURL = "https://mymoney-almir.firebaseio.com/";


const { useGet } = Rest(baseURL);

const Meses = () => {
  const data = useGet("meses");
  if (data.loading) {
    return  <div className="container text-center">
      <ReactLoading type="spin" color="#000" height={80} width={60} />;
    </div>
  }

  if(Object.keys(data.data).length > 0) {
    return (
      <table className="table">
        <thead>
          <tr>
            <td>Mês</td>
            <th>Previsão entrada</th>
            <th>Entrada</th>
            <th>Previsão Saída</th>
            <td>Saída</td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data.data).map((mes) => {
            return (
              <tr key={mes}>
                <td><Link to={`/movimentacoes/${mes}`}>{mes}</Link></td>
                <td>{data.data[mes].previsao_entrada}</td>
                <td>{data.data[mes].entrada}</td>
                <td>{data.data[mes].previsao_saida}</td>
                <td>{data.data[mes].saida}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return <ReactLoading type="spin" color="#000" height={80} width={60} />;
};

export default Meses;
