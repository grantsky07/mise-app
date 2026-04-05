# Mise — Deployment Guide

Get Mise running on your iPhone in about 15 minutes. Free to host, no app store required.

## What you'll need

- A free GitHub account (github.com)
- A free Vercel account (vercel.com)
- Your Anthropic API key from console.anthropic.com

## Step 1 — Deploy to Vercel

1. Go to vercel.com and sign in with GitHub
2. Click Add New → Project
3. Find mise-app and click Import
4. Click Environment Variables and add:
   - Name: ANTHROPIC_API_KEY
   - Value: your key starting with sk-ant-
5. Click Deploy

## Step 2 — Add to iPhone home screen

1. Open Safari on your iPhone
2. Go to your Vercel URL
3. Tap the Share button
4. Tap Add to Home Screen
5. Name it Mise and tap Add
