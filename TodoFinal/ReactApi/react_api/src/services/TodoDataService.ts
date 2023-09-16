import ITodoModel from "../types/TodoModel";
import http from "../http-common";

const getAll = (id?: number) => {
    if(id != null)
    {
        return http.get<Array<ITodoModel>>(`/GetTodo?st=${id}`);
    }
    return http.get<Array<ITodoModel>>(`/GetTodo`);
};

const create = (data: ITodoModel) => {
    return http.post<ITodoModel>("/AddNewTodo", data, {
        headers: {
          'Content-Type': 'application/json',
        },
    }); 
};

const update = (id: number, data: ITodoModel) => {
    return http.post<any>(`/EditTodo?id=${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
    }); 
};

const changeStatus = (id: number, status: number) => {
    return http.post<any>(`/ChangeStatus?id=${id}&status=${status}`, {
        headers: {
          'Content-Type': 'application/json',
        },
    }); 
};

const TodoDataService = {
    getAll,
    create,
    update,
    changeStatus,
}

export default TodoDataService;