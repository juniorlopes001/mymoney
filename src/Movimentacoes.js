import React, { useState } from "react";
import Rest from "./rest";
import { withAlert } from 'react-alert'

const baseURL = "https://mymoney-almir.firebaseio.com/";

const { useGet, usePost, useDelete } = Rest(baseURL);

const Movimentacoes = ({ match }) => {
  const data = useGet(`movimentacoes/${match.params.dataMov}`);
  const [postData, salvar] = usePost(`movimentacoes/${match.params.dataMov}`);
  const [remover] = useDelete();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const onChangeDescricao = (evt) => {
    setDescricao(evt.target.value);
  };

  const onChangeValor = (evt) => {
    setValor(evt.target.value);
  };

  const salvarMovimentacao = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
        descricao,
        valor: parseFloat(valor),
      });
      setDescricao("");
      setValor(0);
      data.refetch();
    } else {
      alert('Por favor insira somente números')
    }
  };

  const removerMovimentacao = async (id) => {
    await remover(`movimentacoes/${match.params.dataMov}/${id}`);
    data.refetch();
  };

  return (
    <>
      <h1>Movimentações</h1>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.data &&
            Object.keys(data.data).map((movimentacao) => {
              return (
                <tr key={movimentacao}>
                  <td>{data.data[movimentacao].descricao}</td>
                  <td>
                    {data.data[movimentacao].valor}
                    <button className='btn btn-danger text-right'
                      onClick={() => removerMovimentacao(movimentacao)}
                    >Remover</button>
                  </td>
                </tr>
              );
            })}
          <tr>
            <td>
              <input
                type="text"
                value={descricao}
                onChange={onChangeDescricao}
              ></input>
            </td>
            <td>
              <input type="text" value={valor} onChange={onChangeValor}></input>
              <button className='btn btn-primary text-right' onClick={salvarMovimentacao}>ADICIONAR +</button>
            </td>
          </tr>
        </tbody>
      </table>

      <pre>{JSON.stringify(data)}</pre>
    </>
  );
};

export default Movimentacoes;
