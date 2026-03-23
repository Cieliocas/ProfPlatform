import type { User } from "@/src/types/auth"

export const DEMO_TOKEN = "demo-token"

export const DEMO_CREDENTIALS = {
  email: "suzianne@bioativa.app",
  password: "suzianne2026",
}

export const DEMO_USER: User = {
  id: 1,
  name: "Suzianne Valadares",
  email: DEMO_CREDENTIALS.email,
  bio: "Professora de Biologia do Ensino Medio, com foco em sequencias didaticas investigativas e alfabetizacao cientifica.",
  location_city: "Teresina",
  location_state: "PI",
  location_country: "Brasil",
  graduation_level: "Mestrado em Ensino de Biologia",
  workplace: "Rede Estadual de Ensino",
  instagram_link: "@suzianne.valadares",
  email_link: DEMO_CREDENTIALS.email,
  custom_link: "https://bioativa.vercel.app",
  show_location: true,
  show_graduation: true,
  show_workplace: true,
  show_socials: true,
}

