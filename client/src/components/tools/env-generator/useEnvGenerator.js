import { useState, useCallback, useMemo } from 'react'
import { languages, databases, services } from './stacks'

export default function useEnvGenerator() {
  const [selectedLang, setSelectedLang] = useState(null)
  const [selectedDb, setSelectedDb] = useState(null)
  const [selectedServices, setSelectedServices] = useState([])

  const toggleService = useCallback((id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    )
  }, [])

  const lang = useMemo(() => languages.find((l) => l.id === selectedLang), [selectedLang])
  const db = useMemo(() => databases.find((d) => d.id === selectedDb), [selectedDb])
  const svcs = useMemo(
    () => services.filter((s) => selectedServices.includes(s.id)),
    [selectedServices],
  )

  const canGenerate = !!selectedLang

  // --- Generate Docker Compose ---
  const dockerCompose = useMemo(() => {
    if (!canGenerate) return ''

    const lines = ['version: "3.8"', '', 'services:']

    // App service
    lines.push(`  app:`, `    build: .`, `    ports:`, `      - "${lang.defaultPort}:${lang.defaultPort}"`)

    // App env_file
    lines.push(`    env_file:`, `      - .env`)

    // depends_on
    const deps = []
    if (db) deps.push(db.id === 'mongodb' ? 'mongo' : db.id)
    svcs.forEach((s) => deps.push(s.id))
    if (deps.length) {
      lines.push(`    depends_on:`)
      deps.forEach((d) => {
        lines.push(`      ${d}:`, `        condition: service_healthy`)
      })
    }

    lines.push(`    restart: unless-stopped`, `    networks:`, `      - app-network`, '')

    // Database service
    if (db) {
      const svcName = db.id === 'mongodb' ? 'mongo' : db.id
      lines.push(`  ${svcName}:`, `    image: ${db.image}`, `    ports:`, `      - "${db.port}"`)
      if (Object.keys(db.envVars).length) {
        lines.push(`    environment:`)
        Object.entries(db.envVars).forEach(([k, v]) => {
          lines.push(`      ${k}: "${v}"`)
        })
      }
      if (db.volumes?.length) {
        lines.push(`    volumes:`)
        db.volumes.forEach((v) => lines.push(`      - ${v}`))
      }
      if (db.healthcheck) {
        lines.push(`    healthcheck:`)
        lines.push(`      test: ${JSON.stringify(db.healthcheck.test)}`)
        lines.push(`      interval: ${db.healthcheck.interval}`)
        lines.push(`      timeout: ${db.healthcheck.timeout}`)
        lines.push(`      retries: ${db.healthcheck.retries}`)
      }
      lines.push(`    restart: unless-stopped`, `    networks:`, `      - app-network`, '')
    }

    // Extra services
    svcs.forEach((s) => {
      lines.push(`  ${s.id}:`, `    image: ${s.image}`)
      if (s.command) lines.push(`    command: ${s.command}`)

      const allPorts = [s.port, ...(s.extraPorts || [])]
      lines.push(`    ports:`)
      allPorts.forEach((p) => lines.push(`      - "${p}"`))

      if (Object.keys(s.envVars).length) {
        lines.push(`    environment:`)
        Object.entries(s.envVars).forEach(([k, v]) => {
          lines.push(`      ${k}: "${v}"`)
        })
      }
      if (s.volumes?.length) {
        lines.push(`    volumes:`)
        s.volumes.forEach((v) => lines.push(`      - ${v}`))
      }
      if (s.healthcheck) {
        lines.push(`    healthcheck:`)
        lines.push(`      test: ${JSON.stringify(s.healthcheck.test)}`)
        lines.push(`      interval: ${s.healthcheck.interval}`)
        lines.push(`      timeout: ${s.healthcheck.timeout}`)
        lines.push(`      retries: ${s.healthcheck.retries}`)
      }
      lines.push(`    restart: unless-stopped`, `    networks:`, `      - app-network`, '')
    })

    // Volumes
    const namedVolumes = []
    if (db?.volumes) {
      db.volumes.forEach((v) => {
        const name = v.split(':')[0]
        if (!name.startsWith('.')) namedVolumes.push(name)
      })
    }
    svcs.forEach((s) => {
      if (s.namedVolumes === false) return
      s.volumes?.forEach((v) => {
        const name = v.split(':')[0]
        if (!name.startsWith('.')) namedVolumes.push(name)
      })
    })

    if (namedVolumes.length) {
      lines.push('volumes:')
      namedVolumes.forEach((v) => lines.push(`  ${v}:`))
      lines.push('')
    }

    // Networks
    lines.push('networks:', '  app-network:', '    driver: bridge', '')

    return lines.join('\n')
  }, [canGenerate, lang, db, svcs])

  // --- Generate .env ---
  const envFile = useMemo(() => {
    if (!canGenerate) return ''

    const lines = ['# === App ===']
    Object.entries(lang.envVars).forEach(([k, v]) => lines.push(`${k}=${v}`))

    if (db) {
      lines.push('', `# === ${db.name} ===`)
      Object.entries(db.envVars).forEach(([k, v]) => lines.push(`${k}=${v}`))
      Object.entries(db.appEnv).forEach(([k, v]) => lines.push(`${k}=${v}`))
    }

    svcs.forEach((s) => {
      const allEnv = { ...s.envVars, ...s.appEnv }
      if (Object.keys(allEnv).length) {
        lines.push('', `# === ${s.name} ===`)
        Object.entries(allEnv).forEach(([k, v]) => lines.push(`${k}=${v}`))
      }
    })

    return lines.join('\n') + '\n'
  }, [canGenerate, lang, db, svcs])

  // --- Generate .dockerignore ---
  const dockerignore = useMemo(() => {
    if (!canGenerate) return ''
    return [...lang.dockerignore, '.env.example', 'docker-compose.yml', 'README.md', ''].join('\n')
  }, [canGenerate, lang])

  // --- Dockerfile ---
  const dockerfile = useMemo(() => {
    if (!canGenerate) return ''
    return lang.dockerfile + '\n'
  }, [canGenerate, lang])

  return {
    // Selection state
    selectedLang,
    setSelectedLang,
    selectedDb,
    setSelectedDb,
    selectedServices,
    toggleService,
    canGenerate,

    // Data
    languages,
    databases,
    services,

    // Generated files
    dockerCompose,
    envFile,
    dockerignore,
    dockerfile,
  }
}
