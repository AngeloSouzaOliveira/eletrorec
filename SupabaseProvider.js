import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabase";

const SupabaseContext = createContext();

export function useSupabase() {
  return useContext(SupabaseContext);
}

export function SupabaseProvider({ children }) {
  const [partnersData, setPartnersData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);

  // Tabela partners
  async function loadAllPartners() {
    const { data, error } = await supabase
      .from("partners")
      .select()
      .order("id");
    if (error) {
      console.error("Erro ao carregar dados da partners:", error);
    } else {
      setPartnersData(data);
    }
  }

  async function selectByIdPartners(id) {
    const { data, error } = await supabase
      .from("partners")
      .select()
      .eq("id", id);
    if (error) {
      console.error("Erro ao carregar dados da partners:", error);
    } else {
      setPartnersData(data);
    }
  }

  async function deletePartnersById(id) {
    const { data, error } = await supabase.from("partners").delete().eq("id", id);
    if (error) {
      console.error("Erro ao excluir o Partners:", error);
    } else {
      console.log("Partners excluído com sucesso.")
      return true;
    }
  }

  async function updatePartnersById(id, updatedPartnersData) {
    const { data, error } = await supabase
      .from("partners")
      .update(updatedPartnersData)
      .eq("id", id);
  
    if (error) {
      console.error("Erro ao atualizar o Partners:", error);
    } else {
      console.log("Partners atualizado com sucesso.");
    }
  }

  async function createNewPartners(newPartnersData) {
    const { data, error } = await supabase.from("partners").insert([newPartnersData]);
  
    if (error) {
      console.error("Erro ao cadastrar news:", error);
    } else {
      console.log("News cadastrada com sucesso.");
    }
  }


  // Tabela news
  async function loadAllNews() {
    const { data, error } = await supabase.from("news").select().order("id");
    if (error) {
      console.error("Erro ao carregar dados da news:", error);
    } else {
      setNewsData(data);
    }
  }

  async function selectByIdNews(id) {
    const { data, error } = await supabase.from("news").select().eq("id", id);
    if (error) {
      console.error("Erro ao carregar dados da news:", error);
    } else {
      setNewsData(data);
    }
  }

  async function deleteNewsById(id) {
    const { data, error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      console.error("Erro ao excluir o news:", error);
    } else {
      console.log("News excluído com sucesso.")
      return true;
    }
  }

  async function updateNewsById(id, updatedEventData) {
    const { data, error } = await supabase
      .from("news")
      .update(updatedEventData)
      .eq("id", id);
  
    if (error) {
      console.error("Erro ao atualizar o News:", error);
    } else {
      console.log("Newws atualizado com sucesso.");
    }
  }

  async function createNewNews(newData) {
    const { data, error } = await supabase.from("news").insert([newData]);
  
    if (error) {
      console.error("Erro ao cadastrar news:", error);
    } else {
      console.log("News cadastrada com sucesso.");
    }
  }

  // Tabela Evento
  async function loadTableEvents() {
    const { data, error } = await supabase.from("events").select().order("id");
    if (error) {
      console.error("Erro ao carregar dados da events:", error);
    } else {
      setEventsData(data);
    }
  }

  async function selectByIdEvents(id) {
    const { data, error } = await supabase.from("events").select().eq("id", id);
    if (error) {
      console.error("Erro ao carregar dados da events:", error);
    } else {
      setEventsData(data);
    }
  }

  async function deleteEventById(id) {
    const { data, error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      console.error("Erro ao excluir o evento:", error);
    } else {
      console.log("Evento excluído com sucesso.")
      return true;
    }
  }

  async function updateEventById(id, updatedEventData) {
    const { data, error } = await supabase
      .from("events")
      .update(updatedEventData)
      .eq("id", id);
  
    if (error) {
      console.error("Erro ao atualizar o evento:", error);
    } else {
      console.log("Evento atualizado com sucesso.");
    }
  }

  async function createNewEvent(eventData) {
    const { data, error } = await supabase.from("events").insert([eventData]);
  
    if (error) {
      console.error("Erro ao cadastrar o novo evento:", error);
    } else {
      console.log("Novo evento cadastrado com sucesso.");
    }
  }

  useEffect(() => {
    loadAllPartners();
    selectByIdPartners();
    deletePartnersById();
    updatePartnersById();
    createNewPartners();
    loadAllNews();
    selectByIdNews();
    deleteNewsById();
    updateNewsById();
    createNewNews();
    loadTableEvents();
    selectByIdEvents();
    deleteEventById();
    createNewEvent();
    updateEventById();


    
  }, []);

  return (
    <SupabaseContext.Provider
      value={{
        partnersData,
        newsData,
        eventsData,
        loadAllPartners,
        selectByIdPartners,
        deletePartnersById,
        updatePartnersById,
        createNewPartners,
        loadAllNews,
        selectByIdNews,
        deleteNewsById,
        updateNewsById,
        createNewNews,
        loadTableEvents,
        selectByIdEvents,
        deleteEventById,
        createNewEvent,
        updateEventById,

      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
}
