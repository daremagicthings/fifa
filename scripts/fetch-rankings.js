#!/usr/bin/env node
/**
 * Fetches the latest FIFA ranking points from the official FIFA API and patches teams.json.
 * Run by GitHub Actions every Thursday 06:00 UTC.
 *
 * The script reads teams.json, updates the `fifa` field for every team it can match
 * by name, then writes the file back. Unmatched teams are left unchanged.
 */

const fs = require('fs')
const path = require('path')

const TEAMS_PATH = path.join(__dirname, '..', 'lib', 'teams.json')

const FIFA_API = 'https://api.fifa.com/api/v3/rankings/FIFA?language=en'

async function fetchRankings() {
  const res = await fetch(FIFA_API, {
    headers: { 'User-Agent': 'klement-model/1.0' },
  })
  if (!res.ok) throw new Error(`FIFA API returned ${res.status}`)
  const data = await res.json()
  return data.Results ?? []
}

async function main() {
  const teams = JSON.parse(fs.readFileSync(TEAMS_PATH, 'utf8'))

  let rankings
  try {
    rankings = await fetchRankings()
  } catch (err) {
    console.error('Failed to fetch FIFA rankings:', err.message)
    process.exit(1)
  }

  let updated = 0
  for (const entry of rankings) {
    const name = entry.TeamName?.trim()
    const points = Math.round(entry.Points ?? 0)
    if (name && teams[name] && points > 0) {
      teams[name].fifa = points
      updated++
    }
  }

  fs.writeFileSync(TEAMS_PATH, JSON.stringify(teams, null, 2) + '\n', 'utf8')
  console.log(`Updated ${updated} team(s) with latest FIFA ranking points.`)
}

main()
