import { supabase } from './supabase.ts'

export const fetchData = async (tabela) =>{
    const {data, error } = await supabase
    .from(tabela)
    .select()

    if(error) {
        console.error("Erro ao se conectar com banco de dados", error)
    } else {
        console.log(data)
        return data;
    }
}