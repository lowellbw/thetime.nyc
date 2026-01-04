# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static website hosted on GitHub Pages at thetime.nyc that displays the current time in New York City with video backgrounds of the five boroughs.

## Development

This is a vanilla HTML/CSS/JS project with no build process. To develop locally:
- Open `index.html` directly in a browser, or
- Use any local server (e.g., `python -m http.server 8000`)

Deployment is automatic via GitHub Pages when pushing to main.

## Architecture

**Main Time Display (`index.html` + `javascript.js`)**
- Uses native `Intl.DateTimeFormat` API for time handling in America/New_York timezone
- Floating orb elements positioned around screen edges allow switching borough videos
- Time updates every second via `setInterval`

**Styling (`style.css`)**
- Dosis font from Google Fonts
- Responsive breakpoints at 1300px, 1100px, 995px, 530px, and 400px
- Red text-shadow styling on white text creates the visual theme

## Assets

Each borough has a corresponding video and poster image:
- `brooklyn.mp4` / `background-b.jpeg`
- `manhattan.mp4` / `background-manhattan.jpeg`
- `queens.mp4` / `background-q.jpeg`
- `bronx.mp4` / `background-bronx.jpeg`
- `statenisland.mp4` / `background-staten.jpeg`
- `background-shortened.mp4` / `background-m.jpeg` (default)
