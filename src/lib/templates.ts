import templates from "./templates.json";

export default templates;

export type Templates = keyof typeof templates;
export type TemplateId = keyof typeof templates;
export type TemplateConfig = (typeof templates)[TemplateId];