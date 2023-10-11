import { useState } from "react";

export const Dashboard = () => {
  const [lista, setLista] = useState<string[]>([]);
  const [nome, setNome] = useState<string>("");

  const handleClick = () => {
    setLista([...lista, nome]);
    setNome("");
  };
  return (
    <div>
      <label>Insira um nome:</label>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <br />
      <button onClick={handleClick}>Clique</button>
      <ul>
        {lista.map((e) => {
          return <li>{e}</li>;
        })}
      </ul>
    </div>
  );
};
