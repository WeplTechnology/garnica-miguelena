import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content')

export interface Project {
  title: string
  slug: string
  category: 'flat' | 'villa' | 'beach-house' | 'country-house' | 'penthouse' | 'office' | 'retail' | 'hotel'
  location: string
  year: number
  photographer?: string
  description: string
  descriptionEn: string
  featured: boolean
  order: number
  mainImage: string
  gallery: string[]
}

export interface SiteSettings {
  studioName: string
  address: string
  city: string
  phone: string
  email: string
  instagram: string
  pinterest: string
  linkedin: string
  seoTitle: string
  seoDescription: string
}

export interface About {
  text: string
  textEn: string
}

export interface PressItem {
  id: string
  publication: string
  title: {
    es: string
    en: string
  }
  excerpt: {
    es: string
    en: string
  }
  date: string
  image: string
  url: string
  projectSlug?: string
}

// Obtener todos los proyectos
export function getAllProjects(): Project[] {
  const projectsDir = path.join(contentDirectory, 'projects')

  if (!fs.existsSync(projectsDir)) {
    return []
  }

  const folders = fs.readdirSync(projectsDir)

  const projects = folders
    .filter(folder => !folder.startsWith('.'))
    .map(folder => {
      const dataPath = path.join(projectsDir, folder, 'data.json')
      if (!fs.existsSync(dataPath)) return null

      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      return {
        ...data,
        slug: folder
      }
    })
    .filter((p): p is Project => p !== null)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  return projects
}

// Obtener proyectos destacados
export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(p => p.featured)
}

// Obtener proyecto por slug
export function getProjectBySlug(slug: string): Project | null {
  const projectPath = path.join(contentDirectory, 'projects', slug, 'data.json')

  if (!fs.existsSync(projectPath)) return null

  const data = JSON.parse(fs.readFileSync(projectPath, 'utf8'))
  return { ...data, slug }
}

// Obtener todos los slugs (para generateStaticParams)
export function getProjectSlugs(): string[] {
  const projectsDir = path.join(contentDirectory, 'projects')

  if (!fs.existsSync(projectsDir)) {
    return []
  }

  return fs.readdirSync(projectsDir)
    .filter(folder => !folder.startsWith('.'))
    .filter(folder => {
      const dataPath = path.join(projectsDir, folder, 'data.json')
      return fs.existsSync(dataPath)
    })
}

// Obtener configuración del sitio
export function getSiteSettings(): SiteSettings {
  const settingsPath = path.join(contentDirectory, 'settings', 'site.json')
  return JSON.parse(fs.readFileSync(settingsPath, 'utf8'))
}

// Obtener contenido About
export function getAbout(): About {
  const aboutPath = path.join(contentDirectory, 'settings', 'about.json')
  return JSON.parse(fs.readFileSync(aboutPath, 'utf8'))
}

// Obtener prensa
export function getPress(): PressItem[] {
  const pressPath = path.join(contentDirectory, 'press', 'press.json')
  if (!fs.existsSync(pressPath)) return []

  const data: PressItem[] = JSON.parse(fs.readFileSync(pressPath, 'utf8'))
  return data.sort((a, b) => b.date.localeCompare(a.date))
}

// Helper para obtener ruta de imagen de proyecto
export function getProjectImagePath(slug: string, imageName: string): string {
  return `/projects/${slug}/${imageName}`
}

// Categorías de proyectos
export const projectCategories = [
  { value: 'flat', labelEs: 'Piso', labelEn: 'Flat' },
  { value: 'villa', labelEs: 'Villa', labelEn: 'Villa' },
  { value: 'beach-house', labelEs: 'Casa de playa', labelEn: 'Beach House' },
  { value: 'country-house', labelEs: 'Casa de campo', labelEn: 'Country House' },
  { value: 'penthouse', labelEs: 'Ático', labelEn: 'Penthouse' },
  { value: 'office', labelEs: 'Oficina', labelEn: 'Office' },
  { value: 'retail', labelEs: 'Comercio', labelEn: 'Retail' },
  { value: 'hotel', labelEs: 'Hotel', labelEn: 'Hotel' },
] as const

export type ProjectCategory = typeof projectCategories[number]['value']
