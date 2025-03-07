"use client";

import AuthDialog from "@/components/auth-dialog";
import { Chat } from "@/components/chat";
import { ChatInput } from "@/components/chat-input";
import { NavBar } from "@/components/navbar";
import { AuthViewType, useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import modelsList from "@/lib/models.json";
import { ChatPicker } from "@/components/chat-picker";
import templates from "@/lib/templates";
import { ChatSettings } from "@/components/chat-settings";
import { LLMModelConfig } from "@/lib/models";
import { Message } from "@/lib/messages";
import { DeepPartial } from "ai";
import { CodeSchema } from "@/lib/schema";

export default function Home() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthViewType>("sign_in");
  const { session } = useAuth(setIsAuthDialogOpen, setAuthView);
  const [chatInput, setChatInput] = useLocalStorage("chat", "");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<"auto">("auto");
  const [languageModel, setLanguageModel] = useLocalStorage("languageModel", {
    model: "gpt-4o-mini",
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [code, setCode] = useState<DeepPartial<CodeSchema>>();
  const [currentTab, setCurrentTab] = useState<"chat" | "code">("chat");
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  function logout() {
    supabase
      ? supabase.auth.signOut()
      : console.warn("Supabase is not initialized");
  }

  function handleLanguageModelChange(e : LLMModelConfig){
    setLanguageModel({...languageModel, ...e})
  }


  const currentModel = modelsList.models.find(
    (model) => model.id === languageModel.model
  );

  const currentTemplate = selectedTemplate === "auto" ? templates : {[selectedTemplate]: templates[selectedTemplate]};

  const lastMessage = messages[messages.length - 1];

  
  return (
    <div className="flex min-h-screen max-h-screen">
      {supabase && (
        <AuthDialog
          open={isAuthDialogOpen}
          setOpen={setIsAuthDialogOpen}
          supabase={supabase}
          view={authView}
        />
      )}
      <div className="grid w-full md:grid-cols-2">
        <div className="flex flex-col w-full max-w-[800px] mx-auto px-4 overflow-auto col-span-2">
          <NavBar
            canClear={false}
            canUndo={false}
            onClear={() => {}}
            onSocialClick={() => {}}
            onUndo={() => {}}
            session={session}
            showLogin={() => {
              setIsAuthDialogOpen(true);
            }}
            signOut={logout}
          />
          <Chat />
          <ChatInput
            isLoading={false}
            input={chatInput}
            handleInputChange={() => {}}
            handleFileChange={() => {}}
            files={files}
            error={undefined}
            retry={() => {}}
            isMultiModal={false}
            stop={() => {}}
            handleSubmit={() => {}}
          >
            <ChatPicker
              models={modelsList.models}
              templates={templates as any}
              languageModel={languageModel}
              onLanguageModelChange={() => {}}
              onSelectedTemplateChange={() => {}}
              selectedTemplate={selectedTemplate}
            />
            <ChatSettings
              apiKeyConfigurable={true}
              baseURLConfigurable={true}
              languageModel={languageModel}
              onLanguageModelChange={() => {}}
            />
          </ChatInput>
        </div>
      </div>
    </div>
  );
}
