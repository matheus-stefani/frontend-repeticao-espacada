import { useCallback, useEffect, useState } from "react";
import { TarefasService } from "../../shared/services/api/tarefas/TarefasService";
import { ApiException } from "../../shared/services/api/ApiException";

interface ITarefaIngles {
  id?: number;
  nome: string;
  link: string;
  dias: number;
  isSelected?: boolean;
}

export const Dashboard = () => {
  const [lista, setLista] = useState<ITarefaIngles[]>([]);
  const [nome, setNome] = useState<ITarefaIngles>();

  const handleClick = () => {
    setLista((old) => {
      if(!nome?.nome)return old;
      if (old.some((e)=>e.nome===nome?.nome || e.link===nome?.link || e.dias===nome?.dias )) return old;
      return [...old, nome];
    });
    setNome({ dias: 0, isSelected: false, link: "", nome: "" });
  };

  useEffect(()=>{
    TarefasService.getAll().then((data)=>{
      if(data instanceof ApiException){
        alert(data.message)
      }
      else{
        setLista(data)
      }
    }).catch(console.log);
  },[])
  return (
    <div>
      <label>Insira um nome:</label>
      <input
        type="text"
        value={nome?.nome}
        onChange={(e) =>
          setNome({
            nome: e.target.value,
            dias: 0,
            link: "",
            isSelected: false,
          })
        }
      />
      <br />
      <label>Insira um link:</label>
      <input
        type="text"
        value={nome?.link}
        onChange={(e) =>
          setNome((old) => {
            if (!nome?.nome) return old;

            return {
              link: e.target.value,
              dias: nome.dias,
              nome: nome.nome,
              isSelected: false,
            };
          })
        }
      />
      <br />
      <label>Insira um dia:</label>
      <input
        type="number"
        value={nome?.dias}
        onChange={(e) =>
          setNome((old) => {
            if (!nome?.nome) return old;

            if (!nome?.link) return old;
            return {
              dias: Number(e.target.value),
              link: nome.link,
              nome: nome.nome,
              isSelected: false,
            };
          })
        }
      />
      <br />

      <button onClick={handleClick}>Clique</button>

      <p>{lista.filter((e)=> e.isSelected).length}</p>

      <ul>
        {lista.map((e, i) => {
          return (
            <>
            <input type="checkbox" checked={e.isSelected} onChange={()=> setLista((old)=>{
              
                return old.map((j)=>{
                  const newSelected = j.nome === e.nome ? !j.isSelected : j.isSelected;

                  return {...j,isSelected: newSelected}
                })
            })}/>
              
              <li key={e.nome}>Nome: {e.nome}</li>
              <li key={e.link}>Link: {e.link}</li>
              <li key={e.dias}>Dias: {e.dias}</li>
              <li key={i}>{e.isSelected ? 'true' : 'false'}</li>
           
            </>
          );
        })}
      </ul>
    </div>
  );
};
