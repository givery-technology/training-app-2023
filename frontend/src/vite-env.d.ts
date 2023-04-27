/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}