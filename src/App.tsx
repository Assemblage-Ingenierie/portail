import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const AI_ROUGE = '#E30513'
const AI_VIOLET = '#30323E'
const AI_GRIS = '#DFE4E8'
const AI_GRIS_CLAIR = '#F2F2F2'
const AI_ROUGE_CLAIR = '#F9E1E3'

type AppStatus = 'production' | 'beta' | 'dev'
type AppCategory = 'chantier' | 'energie' | 'bdd' | 'structure' | 'autre'

interface AppCard {
  id: string
  name: string
  description: string
  url: string
  status: AppStatus
  category: AppCategory
  location: string
}

const STATUS_LABELS: Record<AppStatus, string> = {
  production: 'Production',
  beta: 'Bêta',
  dev: 'En développement',
}

const STATUS_COLORS: Record<AppStatus, { bg: string; text: string }> = {
  production: { bg: '#D1FAE5', text: '#065F46' },
  beta: { bg: '#FEF3C7', text: '#92400E' },
  dev: { bg: AI_GRIS, text: AI_VIOLET },
}

const CATEGORY_LABELS: Record<AppCategory, string> = {
  chantier: 'Suivi chantier',
  energie: 'Énergie',
  bdd: 'Base de données',
  structure: 'Structure',
  autre: 'Autre',
}

const CATEGORY_ICON: Record<AppCategory, string> = {
  chantier: '🏗',
  energie: '⚡',
  bdd: '🗄',
  structure: '📐',
  autre: '⚙',
}

const DEFAULT_APPS: AppCard[] = [
  {
    id: '1',
    name: 'AI Chantier',
    description: "Application de visite et suivi de chantier avec rapport automatisé, liste de réserves et géolocalisation des observations.",
    url: 'chantier.assemblage.net',
    status: 'beta',
    category: 'chantier',
    location: 'France',
  },
  {
    id: '2',
    name: 'SPEED',
    description: "Application d'audit énergétique des bâtiments. Saisie terrain, calcul de performance et génération de rapport conforme.",
    url: 'speed.assemblage.net',
    status: 'dev',
    category: 'energie',
    location: 'France / International',
  },
  {
    id: '3',
    name: 'PEEB Jordanie',
    description: "Base de données d'audit et de priorisation énergétique de ~50 bâtiments publics jordaniens. Programme AFD/UE.",
    url: 'peeb.assemblage.net',
    status: 'dev',
    category: 'bdd',
    location: 'Jordanie',
  },
]

const EMPTY_FORM: Omit<AppCard, 'id'> = {
  name: '', description: '', url: '', status: 'dev', category: 'autre', location: '',
}

// Composant formulaire réutilisé pour ajout et édition
function AppForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  form: Omit<AppCard, 'id'>
  onChange: (f: Omit<AppCard, 'id'>) => void
  onSubmit: () => void
  onCancel: () => void
  submitLabel: string
}) {
  const inputStyle = { marginTop: 6, fontSize: 13 }
  const selectStyle = {
    marginTop: 6, width: '100%', fontSize: 13, padding: '8px 10px',
    border: `1px solid ${AI_GRIS}`, borderRadius: 6,
    fontFamily: "'Open Sans', sans-serif", color: AI_VIOLET, background: 'white', outline: 'none',
  }
  const labelStyle = { fontSize: 11, fontWeight: 600, color: AI_VIOLET, letterSpacing: 0.5, textTransform: 'uppercase' as const }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 4 }}>
      <div>
        <Label style={labelStyle}>Nom *</Label>
        <Input value={form.name} placeholder="ex. GEPAS Gabon"
          onChange={e => onChange({ ...form, name: e.target.value })}
          style={inputStyle} />
      </div>

      <div>
        <Label style={labelStyle}>Description</Label>
        <textarea value={form.description}
          placeholder="Courte description de l'application..."
          onChange={e => onChange({ ...form, description: e.target.value })}
          rows={3}
          style={{
            marginTop: 6, width: '100%', fontSize: 13, padding: '8px 12px',
            border: `1px solid ${AI_GRIS}`, borderRadius: 6, resize: 'vertical',
            fontFamily: "'Open Sans', sans-serif", outline: 'none', color: AI_VIOLET, boxSizing: 'border-box',
          }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <Label style={labelStyle}>Catégorie</Label>
          <select value={form.category} onChange={e => onChange({ ...form, category: e.target.value as AppCategory })} style={selectStyle}>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <div>
          <Label style={labelStyle}>Statut</Label>
          <select value={form.status} onChange={e => onChange({ ...form, status: e.target.value as AppStatus })} style={selectStyle}>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <Label style={labelStyle}>URL</Label>
          <Input value={form.url} placeholder="xx.assemblage.net"
            onChange={e => onChange({ ...form, url: e.target.value })}
            style={inputStyle} />
        </div>
        <div>
          <Label style={labelStyle}>Localisation</Label>
          <Input value={form.location} placeholder="ex. Jordanie"
            onChange={e => onChange({ ...form, location: e.target.value })}
            style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 6, paddingTop: 10, borderTop: `1px solid ${AI_GRIS}` }}>
        <Button variant="outline" onClick={onCancel} style={{ fontSize: 13, color: AI_VIOLET }}>Annuler</Button>
        <Button onClick={onSubmit} disabled={!form.name.trim()}
          style={{ fontSize: 13, background: AI_ROUGE, color: 'white', border: 'none', fontWeight: 600 }}>
          {submitLabel}
        </Button>
      </div>
    </div>
  )
}

export default function App() {
  const [apps, setApps] = useState<AppCard[]>(DEFAULT_APPS)
  const [addOpen, setAddOpen] = useState(false)
  const [editApp, setEditApp] = useState<AppCard | null>(null)
  const [addForm, setAddForm] = useState<Omit<AppCard, 'id'>>(EMPTY_FORM)
  const [editForm, setEditForm] = useState<Omit<AppCard, 'id'>>(EMPTY_FORM)
  const [activeCategory, setActiveCategory] = useState<AppCategory | 'all'>('all')
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered = activeCategory === 'all' ? apps : apps.filter(a => a.category === activeCategory)

  function handleAdd() {
    if (!addForm.name.trim()) return
    setApps(prev => [...prev, { ...addForm, id: Date.now().toString() }])
    setAddForm(EMPTY_FORM)
    setAddOpen(false)
  }

  function openEdit(app: AppCard) {
    setEditApp(app)
    setEditForm({ name: app.name, description: app.description, url: app.url, status: app.status, category: app.category, location: app.location })
  }

  function handleEdit() {
    if (!editApp || !editForm.name.trim()) return
    setApps(prev => prev.map(a => a.id === editApp.id ? { ...editForm, id: a.id } : a))
    setEditApp(null)
  }

  function handleDelete() {
    if (!editApp) return
    setApps(prev => prev.filter(a => a.id !== editApp.id))
    setEditApp(null)
  }

  const categories: Array<{ key: AppCategory | 'all'; label: string }> = [
    { key: 'all', label: 'Toutes' },
    { key: 'chantier', label: 'Chantier' },
    { key: 'energie', label: 'Énergie' },
    { key: 'bdd', label: 'Base de données' },
    { key: 'structure', label: 'Structure' },
    { key: 'autre', label: 'Autre' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: AI_GRIS_CLAIR, fontFamily: "'Open Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <header style={{ background: AI_GRIS_CLAIR, height: 72, display: 'flex', alignItems: 'center', paddingLeft: 28, paddingRight: 28, borderBottom: `1px solid ${AI_GRIS}`, flexShrink: 0 }}>
        <img
          src="/logo_assemblage.png.png"
          alt="Assemblage Ingénierie"
          style={{ height: 44, objectFit: 'contain' }}
        />
        <div style={{ marginLeft: 24, height: 28, width: 1, background: AI_GRIS }} />
        <span style={{ marginLeft: 20, fontSize: 16, fontWeight: 600, color: AI_VIOLET }}>Portail applicatif</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: '#4D4D4D', background: AI_ROUGE_CLAIR, padding: '4px 12px', borderRadius: 4, fontWeight: 600, letterSpacing: 0.3 }}>
          app.assemblage.net
        </span>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>

        {/* SIDEBAR — sans scrollbar droite */}
        <aside style={{ width: 200, background: AI_VIOLET, display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 72px)', flexShrink: 0, overflowY: 'hidden' }}>
          <div style={{ padding: '28px 0 12px' }}>
            <p style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: 2.5, paddingLeft: 20, marginBottom: 10, textTransform: 'uppercase' }}>
              Catégories
            </p>
            {categories.map(cat => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '11px 20px', fontSize: 13,
                  fontWeight: activeCategory === cat.key ? 600 : 400,
                  color: activeCategory === cat.key ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  borderLeft: activeCategory === cat.key ? `3px solid ${AI_ROUGE}` : '3px solid transparent',
                  transition: 'all 0.12s',
                }}>
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ padding: '16px 16px 28px' }}>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 16 }} />
            <button onClick={() => setAddOpen(true)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '10px 14px', background: AI_ROUGE, color: 'white',
                border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
              Nouvelle app
            </button>
          </div>

          {/* Sigle .A watermark */}
          <div style={{ padding: '0 16px 18px', display: 'flex', justifyContent: 'flex-end', opacity: 0.12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: AI_ROUGE, lineHeight: 1 }}>.</span>
              <span style={{ fontSize: 32, fontWeight: 700, color: 'white', lineHeight: 1 }}>A</span>
            </div>
          </div>
        </aside>

        {/* CONTENU */}
        <main style={{ flex: 1, padding: '36px 36px 60px', overflowY: 'auto', overflowX: 'hidden' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: AI_VIOLET, margin: 0 }}>
              {activeCategory === 'all' ? 'Toutes les applications' : CATEGORY_LABELS[activeCategory as AppCategory]}
            </h1>
            <span style={{ fontSize: 12, color: '#4D4D4D', background: AI_GRIS, padding: '2px 10px', borderRadius: 10, fontWeight: 600 }}>
              {filtered.length}
            </span>
            <div style={{ flex: 1, height: 1, background: `${AI_ROUGE}33` }} />
          </div>

          {/* Grille */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 18 }}>

            {filtered.map(app => (
              <div key={app.id}
                onMouseEnter={() => setHovered(app.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: 'white', borderRadius: 8, overflow: 'hidden',
                  border: `1px solid ${hovered === app.id ? AI_ROUGE : AI_GRIS}`,
                  boxShadow: hovered === app.id ? `0 4px 18px rgba(227,5,19,0.10)` : '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                  display: 'flex', flexDirection: 'column',
                  position: 'relative',
                }}>
                <div style={{ height: 4, background: AI_ROUGE }} />

                {/* Bouton crayon positionné en haut à droite */}
                <button
                  onClick={e => { e.stopPropagation(); openEdit(app) }}
                  title="Modifier"
                  style={{
                    position: 'absolute', top: 12, right: 12, zIndex: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 28, height: 28,
                    fontSize: 15, color: AI_VIOLET,
                    background: 'white', border: `1px solid ${AI_GRIS}`,
                    borderRadius: 6, cursor: 'pointer',
                    transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = AI_VIOLET
                    e.currentTarget.style.background = AI_GRIS
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = AI_GRIS
                    e.currentTarget.style.background = 'white'
                  }}
                >
                  ✎
                </button>

                <div style={{ padding: '18px 18px 14px', display: 'flex', gap: 14, flex: 1 }}>
                  {/* Icône */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 8, background: AI_ROUGE_CLAIR,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, flexShrink: 0,
                  }}>
                    {CATEGORY_ICON[app.category]}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                      <h2 style={{ fontSize: 15, fontWeight: 700, color: AI_VIOLET, margin: 0 }}>{app.name}</h2>
                      <span style={{
                        fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 3,
                        background: STATUS_COLORS[app.status].bg, color: STATUS_COLORS[app.status].text,
                      }}>
                        {STATUS_LABELS[app.status]}
                      </span>
                    </div>
                    <p style={{ fontSize: 12.5, color: '#4D4D4D', lineHeight: 1.55, margin: '0 0 10px' }}>
                      {app.description}
                    </p>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, color: '#4D4D4D' }}>
                        <span style={{ color: AI_ROUGE, fontWeight: 700 }}>›</span> {CATEGORY_LABELS[app.category]}
                      </span>
                      {app.location && (
                        <span style={{ fontSize: 11, color: '#4D4D4D' }}>
                          <span style={{ color: AI_ROUGE, fontWeight: 700 }}>›</span> {app.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer card */}
                <div style={{ borderTop: `1px solid ${AI_GRIS}`, padding: '9px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: AI_GRIS_CLAIR }}>
                  <span style={{ fontSize: 11, color: '#4D4D4D', fontFamily: 'monospace' }}>{app.url}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: AI_ROUGE, opacity: hovered === app.id ? 1 : 0.4, transition: 'opacity 0.15s', cursor: 'pointer' }}>
                    Accéder →
                  </span>
                </div>
              </div>
            ))}

            {/* Card ajout */}
            <div
              onClick={() => setAddOpen(true)}
              style={{
                background: 'white', borderRadius: 8, border: `2px dashed ${AI_GRIS}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                minHeight: 160, cursor: 'pointer', gap: 10, transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = AI_ROUGE
                el.style.background = AI_ROUGE_CLAIR
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = AI_GRIS
                el.style.background = 'white'
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '50%', border: `2px solid ${AI_ROUGE}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, color: AI_ROUGE, fontWeight: 300,
              }}>+</div>
              <span style={{ fontSize: 13, color: AI_ROUGE, fontWeight: 600 }}>Ajouter une application</span>
            </div>
          </div>
        </main>
      </div>

      {/* DIALOG — Ajouter */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent style={{ fontFamily: "'Open Sans', sans-serif", maxWidth: 460 }}>
          <DialogHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{ width: 3, height: 22, background: AI_ROUGE, borderRadius: 2 }} />
              <DialogTitle style={{ color: AI_VIOLET, fontFamily: "'Open Sans', sans-serif", fontSize: 17, fontWeight: 700, margin: 0 }}>
                Nouvelle application
              </DialogTitle>
            </div>
          </DialogHeader>
          <AppForm
            form={addForm}
            onChange={setAddForm}
            onSubmit={handleAdd}
            onCancel={() => { setAddForm(EMPTY_FORM); setAddOpen(false) }}
            submitLabel="Ajouter"
          />
        </DialogContent>
      </Dialog>

      {/* DIALOG — Modifier */}
      <Dialog open={!!editApp} onOpenChange={open => { if (!open) setEditApp(null) }}>
        <DialogContent style={{ fontFamily: "'Open Sans', sans-serif", maxWidth: 460 }}>
          <DialogHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{ width: 3, height: 22, background: AI_VIOLET, borderRadius: 2 }} />
              <DialogTitle style={{ color: AI_VIOLET, fontFamily: "'Open Sans', sans-serif", fontSize: 17, fontWeight: 700, margin: 0 }}>
                Modifier — {editApp?.name}
              </DialogTitle>
            </div>
          </DialogHeader>
          <AppForm
            form={editForm}
            onChange={setEditForm}
            onSubmit={handleEdit}
            onCancel={() => setEditApp(null)}
            submitLabel="Enregistrer"
          />
          {/* Zone suppression */}
          <div style={{ marginTop: 4, paddingTop: 12, borderTop: `1px solid ${AI_GRIS}`, display: 'flex', justifyContent: 'flex-start' }}>
            <button
              onClick={handleDelete}
              style={{
                fontSize: 12, color: '#B91C1C', background: 'none',
                border: `1px solid #FECACA`, borderRadius: 4, padding: '4px 12px',
                cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", fontWeight: 600,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FEF2F2' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none' }}
            >
              Supprimer cette application
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
