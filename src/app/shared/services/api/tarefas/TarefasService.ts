import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

interface ITarefaIngles {
  id: number;
  nome: string;
  link: string;
  dias: number;
//   isSelected?: boolean;
}

const getAll = async (): Promise<ITarefaIngles[] | ApiException> => {
  try {
    await Api().put("/tarefas-ingles-atualizar-dias");
    const { data } = await Api().get("/tarefas-ingles");
    
    return data;
  } catch (error: any) {
    return new ApiException("Erro ao pegar todos os usuarios");
  }
};
const getById = async (id: number): Promise<ITarefaIngles | ApiException> => {
  try {
    const { data } = await Api().get(`/tarefas-ingles/${id}`);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao pegar todos os usuarios");
  }
};
const create = async (
  tarefa: Omit<ITarefaIngles, "id">
): Promise<number | ApiException> => {
  try {
    const { data } = await Api().post(`/tarefas-ingles`, tarefa);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao pegar todos os usuarios");
  }
};
const updateById = async (
  tarefa: Omit<ITarefaIngles, "id">,
  id: number
): Promise<void | ApiException> => {
  try {
    const { data } = await Api().put(`/tarefas-ingles/${id}`, tarefa);
    return;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao pegar todos os usuarios");
  }
};
const deleteById = async (id: number): Promise<void | ApiException> => {
  try {
    const { data } = await Api().delete(`/tarefas-ingles/${id}`);
    return;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao pegar todos os usuarios");
  }
};

export const TarefasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
