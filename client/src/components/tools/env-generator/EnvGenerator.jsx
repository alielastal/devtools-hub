import { useState } from 'react'
import { HiDownload } from 'react-icons/hi'
import StackSelector from './StackSelector'
import CodeEditor from '../../shared/CodeEditor'
import CopyButton from '../../shared/CopyButton'
import useEnvGenerator from './useEnvGenerator'

const tabs = [
  { key: 'compose', label: 'docker-compose.yml', lang: 'yaml' },
  { key: 'env', label: '.env', lang: 'plaintext' },
  { key: 'dockerfile', label: 'Dockerfile', lang: 'dockerfile' },
  { key: 'dockerignore', label: '.dockerignore', lang: 'plaintext' },
]

export default function EnvGenerator() {
  const {
    selectedLang,
    setSelectedLang,
    selectedDb,
    setSelectedDb,
    selectedServices,
    toggleService,
    canGenerate,
    languages,
    databases,
    services,
    dockerCompose,
    envFile,
    dockerignore,
    dockerfile,
  } = useEnvGenerator()

  const [activeTab, setActiveTab] = useState('compose')

  const files = {
    compose: dockerCompose,
    env: envFile,
    dockerfile: dockerfile,
    dockerignore: dockerignore,
  }

  const currentTab = tabs.find((t) => t.key === activeTab)
  const currentContent = files[activeTab]

  const handleDownloadZip = async () => {
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()

    if (dockerCompose) zip.file('docker-compose.yml', dockerCompose)
    if (envFile) zip.file('.env', envFile)
    if (dockerfile) zip.file('Dockerfile', dockerfile)
    if (dockerignore) zip.file('.dockerignore', dockerignore)

    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'docker-config.zip'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex h-full flex-col gap-5 p-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">Env Generator</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Select your stack and get Docker Compose, .env, Dockerfile, and .dockerignore instantly.
        </p>
      </div>

      {/* Stack selectors */}
      <div className="flex flex-col gap-4 rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-800/50">
        <StackSelector
          title="Language / Runtime"
          items={languages}
          selected={selectedLang}
          onSelect={setSelectedLang}
        />
        <StackSelector
          title="Database"
          items={databases}
          selected={selectedDb}
          onSelect={setSelectedDb}
        />
        <StackSelector
          title="Additional Services"
          items={services}
          selected={selectedServices}
          onSelect={toggleService}
          multi
        />
      </div>

      {/* Preview */}
      {canGenerate && (
        <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-surface-200 dark:border-surface-700">
          {/* Tabs + actions */}
          <div className="flex items-center justify-between border-b border-surface-200 px-2 dark:border-surface-700">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`border-b-2 px-3 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <CopyButton text={currentContent} />
              <button
                onClick={handleDownloadZip}
                className="inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs font-medium text-surface-600 transition-colors hover:bg-surface-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700"
              >
                <HiDownload className="h-3.5 w-3.5" />
                ZIP
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1">
            <CodeEditor
              value={currentContent}
              language={currentTab.lang}
              readOnly
              height="450px"
            />
          </div>
        </div>
      )}

      {!canGenerate && (
        <div className="flex flex-1 items-center justify-center text-surface-400">
          Select a language to generate files
        </div>
      )}
    </div>
  )
}
