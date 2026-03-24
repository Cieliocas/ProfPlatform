const SAVED_EXPERIENCES_KEY = "bioativa:saved-experience-ids"
const SAVED_EXPERIENCES_EVENT = "bioativa:saved-experiences-updated"

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function normalizeExperienceId(experienceId: string | number) {
  return String(experienceId).trim()
}

function readSavedExperienceIds() {
  if (!canUseStorage()) return [] as string[]

  const raw = window.localStorage.getItem(SAVED_EXPERIENCES_KEY)
  if (!raw) return [] as string[]

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return [] as string[]
    return parsed.map((id) => normalizeExperienceId(id)).filter(Boolean)
  } catch {
    return [] as string[]
  }
}

function writeSavedExperienceIds(ids: string[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(SAVED_EXPERIENCES_KEY, JSON.stringify(ids))
  window.dispatchEvent(new CustomEvent(SAVED_EXPERIENCES_EVENT))
}

export function getSavedExperienceIds() {
  return readSavedExperienceIds()
}

export function isExperienceSaved(experienceId: string | number) {
  const normalized = normalizeExperienceId(experienceId)
  if (!normalized) return false
  return readSavedExperienceIds().includes(normalized)
}

export function setExperienceSaved(experienceId: string | number, shouldSave: boolean) {
  const normalized = normalizeExperienceId(experienceId)
  if (!normalized) return false

  const current = readSavedExperienceIds()
  const unique = new Set(current)

  if (shouldSave) {
    unique.add(normalized)
  } else {
    unique.delete(normalized)
  }

  writeSavedExperienceIds(Array.from(unique))
  return shouldSave
}

export function toggleExperienceSaved(experienceId: string | number) {
  const currentlySaved = isExperienceSaved(experienceId)
  return setExperienceSaved(experienceId, !currentlySaved)
}

export const savedExperiencesStorageEvent = SAVED_EXPERIENCES_EVENT
